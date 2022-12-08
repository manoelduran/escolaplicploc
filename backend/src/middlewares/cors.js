const defaults = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

/**
 * RegExp to match field-name in RFC 7230 sec 3.2
 *
 * field-name    = token
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 */

var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @public
 */

function append(header, field) {
  if (typeof header !== "string") {
    throw new TypeError("header argument is required");
  }

  if (!field) {
    throw new TypeError("field argument is required");
  }

  // get fields array
  var fields = !Array.isArray(field) ? parse(String(field)) : field;

  // assert on invalid field names
  for (var j = 0; j < fields.length; j++) {
    if (!FIELD_NAME_REGEXP.test(fields[j])) {
      throw new TypeError("field argument contains an invalid header name");
    }
  }

  // existing, unspecified vary
  if (header === "*") {
    return header;
  }

  // enumerate current values
  var val = header;
  var vals = parse(header.toLowerCase());

  // unspecified vary
  if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
    return "*";
  }

  for (var i = 0; i < fields.length; i++) {
    var fld = fields[i].toLowerCase();

    // append value (case-preserving)
    if (vals.indexOf(fld) === -1) {
      vals.push(fld);
      val = val ? val + ", " + fields[i] : fields[i];
    }
  }

  return val;
}

/**
 * Parse a vary header into an array.
 *
 * @param {String} header
 * @return {Array}
 * @private
 */

function parse(header) {
  var end = 0;
  var list = [];
  var start = 0;

  // gather tokens
  for (var i = 0, len = header.length; i < len; i++) {
    switch (header.charCodeAt(i)) {
      case 0x20 /*   */:
        if (start === end) {
          start = end = i + 1;
        }
        break;
      case 0x2c /* , */:
        list.push(header.substring(start, end));
        start = end = i + 1;
        break;
      default:
        end = i + 1;
        break;
    }
  }

  // final token
  list.push(header.substring(start, end));

  return list;
}

/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @public
 */

function vary(res, field) {
  if (!res || !res.getHeader || !res.setHeader) {
    // quack quack
    throw new TypeError("res argument is required");
  }

  // get existing header
  var val = res.getHeader("Vary") || "";
  var header = Array.isArray(val) ? val.join(", ") : String(val);

  // set new header
  if ((val = append(header, field))) {
    res.setHeader("Vary", val);
  }
}

function isString(string) {
  return typeof string === "string" || string instanceof String;
}

function isOriginAllowed(origin, allowedOrigin) {
  if (Array.isArray(allowedOrigin)) {
    for (var i = 0; i < allowedOrigin.length; ++i) {
      if (isOriginAllowed(origin, allowedOrigin[i])) {
        return true;
      }
    }
    return false;
  } else if (isString(allowedOrigin)) {
    return origin === allowedOrigin;
  } else if (allowedOrigin instanceof RegExp) {
    return allowedOrigin.test(origin);
  } else {
    return !!allowedOrigin;
  }
}

function configureOrigin(options, req) {
  const requestOrigin = req.headers.origin;
  const headers = [];
  let isAllowed;

  if (!options.origin || options.origin === "*") {
    // allow any origin
    headers.push([
      {
        key: "Access-Control-Allow-Origin",
        value: "*",
      },
    ]);
  } else if (isString(options.origin)) {
    // fixed origin
    headers.push([
      {
        key: "Access-Control-Allow-Origin",
        value: options.origin,
      },
    ]);
    headers.push([
      {
        key: "Vary",
        value: "Origin",
      },
    ]);
  } else {
    isAllowed = isOriginAllowed(requestOrigin, options.origin);
    // reflect origin
    headers.push([
      {
        key: "Access-Control-Allow-Origin",
        value: isAllowed ? requestOrigin : false,
      },
    ]);
    headers.push([
      {
        key: "Vary",
        value: "Origin",
      },
    ]);
  }

  return headers;
}

function configureMethods(options) {
  let methods = options.methods || defaults.methods;

  if (methods.join) {
    methods = options.methods.join(",");
  }

  return {
    key: "Access-Control-Allow-Methods",
    value: methods,
  };
}

function configureCredentials(options) {
  if (options.credentials === true) {
    return {
      key: "Access-Control-Allow-Credentials",
      value: "true",
    };
  }
  return null;
}

function configureAllowedHeaders(options, req) {
  let allowedHeaders = options.allowedHeaders || options.headers;
  const headers = [];

  if (!allowedHeaders) {
    allowedHeaders = req.headers["access-control-request-headers"];
    headers.push([
      {
        key: "Vary",
        value: "Access-Control-Request-Headers",
      },
    ]);
  } else if (allowedHeaders.join) {
    allowedHeaders = allowedHeaders.join(",");
  }
  if (allowedHeaders && allowedHeaders.length) {
    headers.push([
      {
        key: "Access-Control-Allow-Headers",
        value: allowedHeaders,
      },
    ]);
  }

  return headers;
}

function configureExposedHeaders(options) {
  let headers = options.exposedHeaders;

  if (!headers) {
    return null;
  } else if (headers.join) {
    headers = headers.join(","); // .headers is an array, so turn it into a string
  }
  if (headers && headers.length) {
    return {
      key: "Access-Control-Expose-Headers",
      value: headers,
    };
  }
  return null;
}

function configureMaxAge(options) {
  const maxAge =
    (typeof options.maxAge === "number" || options.maxAge) &&
    options.maxAge.toString();

  if (maxAge && maxAge.length) {
    return {
      key: "Access-Control-Max-Age",
      value: maxAge,
    };
  }

  return null;
}

function applyHeaders(headers, res) {
  for (var i = 0, n = headers.length; i < n; i++) {
    const header = headers[i];
    if (header) {
      if (Array.isArray(header)) {
        applyHeaders(header, res);
      } else if (header.key === "Vary" && header.value) {
        vary(res, header.value);
      } else if (header.value) {
        res.setHeader(header.key, header.value);
      }
    }
  }
}

function cors(options = defaults) {
  return (req, res, next) => {
    const headers = [];

    const method =
      req.method && req.method.toUpperCase && req.method.toUpperCase();

    if (method === "OPTIONS") {
      // preflight
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options));
      headers.push(configureMethods(options));
      headers.push(configureAllowedHeaders(options, req));
      headers.push(configureMaxAge(options));
      headers.push(configureExposedHeaders(options));
      applyHeaders(headers, res);

      if (options.preflightContinue) {
        next();
      } else {
        // Safari (and potentially other browsers) need content-length 0,
        //   for 204 or they just hang waiting for a body
        res.statusCode =
          options.optionsSuccessStatus || defaults.optionsSuccessStatus;
        res.setHeader("Content-Length", "0");
        res.end();
      }
    } else {
      // actual response
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options));
      headers.push(configureExposedHeaders(options));
      applyHeaders(headers, res);
      next();
    }
  };
}

export { cors };

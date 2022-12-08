const defaults = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

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
  const methods = options.methods;

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
  const allowedHeaders = options.allowedHeaders || options.headers;
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

function cors(options) {
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
        res.statusCode = options.optionsSuccessStatus;
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

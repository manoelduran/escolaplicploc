import { SchoolRepository } from "../modules/schools/repositories/SchoolRepository.js";

const seeds = async () => {
    const schoolRepository = new SchoolRepository()
    const school = {
      name: "Escola Plic Ploc",
      CNPJ: "29951933000146",
      logo: "https://github.com/manoelduran/escolaplicploc/blob/main/backend/src/assets/plicploc.svg",
      address: "Rua Sônia Barradas, Nova Brasília, Salvador, BA, 41350-500"
    }
    await schoolRepository.create(school)
}

seeds()
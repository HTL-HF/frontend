const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  forms: "/forms",
  createForm: "/forms/create",
  form(id: string) {
    return this.forms + id;
  },
};

export default paths;

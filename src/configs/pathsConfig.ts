const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  forms: "/forms",
  createForm: "/forms/create",
  form(id: string) {
    return `${this.forms}/${id}`;
  },
  responses(id: string) {
    return `${this.form(id)}/responses`;
  },
  notFound: "/404",
};

export default paths;

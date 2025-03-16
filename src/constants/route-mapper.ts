const DEFINE_ROUTERS_ADMIN = {
  homeAdmin: "/admin",
  eventsManager: "/admin/events-manager",
  editEvent: "/admin/events-manager/:id",
  newEvent: "/admin/events-manager/new-event",
  loginAdmin: "/login-admin",
};

const DEFINE_USER_ROUTERS = {
  home: "/",
  
  musicConcert: "/music-concert",
  culturalArts: "/cultural-arts",
  travel: "/travel",
  workshop: "/workshop",
  movie: "/movie",
  tour: "/tour",
  sports: "/sports",
  news: "/news",
  other: "/other",

  eventDetail: "/:id",
}

export { DEFINE_ROUTERS_ADMIN, DEFINE_USER_ROUTERS };

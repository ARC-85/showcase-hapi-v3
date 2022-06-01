export const clientAboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Showcase",
        };
        return h.view("client-about-view", viewData);
      },
    },
  };
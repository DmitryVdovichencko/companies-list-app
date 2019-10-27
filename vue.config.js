module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `
            @import "@/styles/primitive-ui/main.scss";
          `
        }
      }
    }
  };
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
            @import "@/assets/global.scss";
          `,
      },
    },
  },
};

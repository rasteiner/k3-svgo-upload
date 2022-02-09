import {optimize} from 'svgo/dist/svgo.browser';

//panel is a global variable
declare var panel: any;

panel.plugin('rasteiner/k3-svgo-upload', {
  use: [
    function(Vue) {
      const originalUpload = Vue.component('k-upload').options;
      const originalSection = Vue.component('k-files-section').options;
      const originalField = Vue.component('k-files-field').options;

      const newUpload = {
        extends: originalUpload,
        data() {
          return {
            svgo: false,
          };
        },
        methods: {
          /**
           *
           * @param {File[]} files
           */
          async upload(files) {
            if (this.svgo) {
              files = await Promise.all([...files].map(async (file) => {
                if (file.type == 'image/svg+xml') {
                  //read content of file
                  const content = await file.text();

                  const optimized = optimize(content, {
                    multipass: true,
                  });

                  if("data" in optimized && optimized.data.length < content.length) {
                    return new File([optimized.data], file.name, {
                      type: file.type,
                      lastModified: file.lastModified,
                    });
                  } else {
                    return file;
                  }
                } else {
                  return file;
                }
              }))
            }
            originalUpload.methods.upload.call(this, files);
          }
        }
      }

      const newSection = {
        extends: originalSection,
        props: {
          svgo: {
            type: Boolean,
            default: false,
          },
        },
        components: {
          kUpload: newUpload,
        },
        updated() {
          this.$nextTick(() => {
            this.$refs.upload.svgo = this.svgo;
          });
        }
      }

      const newField = {
        extends: originalField,
        props: {
          svgo: {
            type: Boolean,
            default: false,
          },
        },
        components: {
          kUpload: newUpload,
        },
        mounted() {
          this.$nextTick(() => {
            this.$refs.fileUpload.svgo = this.svgo;
          });
        }
      }



      Vue.component('k-upload', newUpload);
      Vue.component('k-files-section', newSection);
      Vue.component('k-files-field', newField);
    }
  ]
});

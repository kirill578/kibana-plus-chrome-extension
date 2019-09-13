chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

			var observer = new MutationObserver(function (mutations, observer) {
				$(".doc-viewer-value").each(function () {
					const element = $(this).find("span");
					element.html(element.html().replace(/\{.*\}/gs, (match) => {
						try {
							function inner(key, value) {
								try {
									if (typeof value === "string") {
										return JSON.parse(value);
									} else {
										return value;
									}
								} catch (e) {
									return value;
								}
							}
							return '<div style="background-color: #333; color: white;">' + JSON.stringify(JSON.parse(match), inner, 4) + '</div>';
						} catch (e) {
							return match;
						}
					}));
				});
			});

			observer.observe(document, {
				subtree: true,
				attributes: true
			});
		}
	}, 10);
});
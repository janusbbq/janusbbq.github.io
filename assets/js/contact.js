// Contact helpers shared by the home and about pages.
//
// 1. The email icon is a plain mailto: link, which does nothing on machines
//    without a default mail app, so it also copies the address and says so.
// 2. The contact form has no server behind it (GitHub Pages is static). It
//    composes an email in the visitor's mail app, and copies the message so it
//    can be pasted into webmail if no mail app opens.
(function () {
  var toast = document.createElement("div");
  toast.className = "site-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);

  function show(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.classList.remove("show");
    }, 5000);
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return false;
        }
      );
    }
    return Promise.resolve(false);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('.contact-icons a[href^="mailto:"]');
    if (!link) return;
    var address = link.getAttribute("href").replace(/^mailto:/, "");
    copy(address).then(function (ok) {
      show(ok ? "Email address copied: " + address : "Email: " + address);
    });
  });

  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var to = form.getAttribute("data-to");
    var name = form.elements.name.value.trim();
    var from = form.elements.email.value.trim();
    var topic = form.elements.topic.value;
    var message = form.elements.message.value.trim();
    var subject = "[" + topic + "] Message from " + (name || "website visitor");
    var body = message + "\n\n— " + name + (from ? " <" + from + ">" : "");
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    copy("To: " + to + "\nSubject: " + subject + "\n\n" + body).then(function (ok) {
      show(
        ok
          ? "Opening your email app. If nothing opens, the message is copied: paste it into an email to " + to + "."
          : "Opening your email app. If nothing opens, please email " + to + "."
      );
    });
  });
})();

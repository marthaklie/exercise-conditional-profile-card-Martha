import "../style/index.css";

function startWidget() {
  /**
   *  EDIT ONLY INSIDE THIS RENDER FUNCTION
   *  This function is called every time the user changes types or changes any input
   * 
      {
          includeCover: true, // if includeCover is true the algorithm should show the cover image
          background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
          avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
          socialMediaPosition: "right", // social media bar position (left or right)
          
          twitter: null, // social media usernames
          github: null,
          linkedin: null,
          instagram: null,

          name: null,
          lastName: null,
          role: null,
          country: null,
          city: null
      }
   */

  window.variables = {
    includeCover: true,
    background: "public/assets/img/pexels-miguel-á-padriñán-255379.jpg",
    avatarURL: "public/assets/img/pexels-pixabay-415829.jpg",
    socialMediaPosition: "right",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  function render(variables = {}) {
    console.log("These are the current variables: ", variables);

    let cover = variables.includeCover
      ? `<div class="cover"><img src="${variables.background}" /></div>`
      : "<div class='cover'></div>";

    const socialLinks = {
      twitter: "https://twitter.com/",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      instagram: "https://instagram.com/"
    };

    const socialMediaLinks = Object.entries(socialLinks)
      .map(([key, url]) => {
        if (variables[key]) {
          return `<li><a href="${url +
            variables[key]}"><i class="fab fa-${key}"></i></a></li>`;
        }
        return "";
      })
      .join("");

    const name = variables.name ? variables.name : "Lucy";
    const lastName = variables.lastName ? variables.lastName : "Boilett";
    const role = variables.role ? variables.role : "Web Developer";
    const city = variables.city ? variables.city : "Miami";
    const country = variables.country ? variables.country : "USA";

    const widgetHTML = `
      <div class="widget">
        ${cover}
        <img src="${variables.avatarURL}" class="photo" />
        <h1>${name} ${lastName}</h1>
        <h2>${role}</h2>
        <h3>${city}, ${country}</h3>
        <ul class="${variables.socialMediaPosition}">
          ${socialMediaLinks}
        </ul>
      </div>
    `;

    document.querySelector("#widget_content").innerHTML = widgetHTML;
  }

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;

      // Create a new object merging existing variables and the updated value
      const updatedVariables = {
        ...window.variables, // Existing variables
        ...values // Updated value
      };

      render(updatedVariables); // Render again the card with new values
      window.variables = updatedVariables; // Update the global variables
    });
  });

  // Render for the first time
  render(window.variables);
}

// Call the function to start the widget
startWidget();

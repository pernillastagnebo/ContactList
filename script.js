contacts = [
  {
    "name": "Roselyn Hahn",
    "email": "roselyn.hahn@example.com"
  },
  {
    "name": "Javon Gleichner",
    "email": "javon.gleichner@example.com"
  },
  {
    "name": "Madonna Metz",
    "email": "madonna.metz@example.com"
  },
  {
    "name": "Jeffrey Ryan",
    "email": "jeffrey.ryan@example.com"
  },
  {
    "name": "Nat Stiedemann",
    "email": "nat.stiedemann@example.com"
  },
  {
    "name": "Nicklaus Stokes",
    "email": "nicklaus.stokes@example.com"
  },
  {
    "name": "Morris Bechtelar",
    "email": "morris.bechtelar@example.com"
  },
  {
    "name": "Michale Hammes",
    "email": "michale.hammes@example.com"
  },
  {
    "name": "Keyon Herzog",
    "email": "keyon.herzog@example.com"
  },
  {
    "name": "Brody Schaefer",
    "email": "brody.schaefer@example.com"
  },
  {
    "name": "Stacey Kozey",
    "email": "stacey.kozey@example.com"
  }
];

window.onload = function () {
  function render() {
    document.getElementById("js-contactList").innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
      const el = document.createElement("div");
      el.innerHTML = "<p class='contactList_itemName'>" + contacts[i].name + "</p>";

      if (contacts[i] == contacts[0]) {
        el.className = 'contactList_item contactList_item_first';
      } else if (contacts[i] == contacts[contacts.length - 1]){
        el.className = 'contactList_item contactList_item_last';
      } else {
        el.className = 'contactList_item';
      }

      el.id = i;
      el.onclick = e => {
        const contactId = parseInt(e.currentTarget.id);
        const details = document.getElementById('js-details');
        let favouriteContact = contacts[parseInt(e.currentTarget.id)].favourite ? "details_favourite_checked" : "details_favourite_unchecked";

        details.innerHTML =
          "<div class='details_topRow'>" +
            "<div class='details_nameAndFavorite'>" +
              "<p class='details_name'>" + contacts[parseInt(e.currentTarget.id)].name + "</p>" +
              "<span id='js-details_favourite' class='icon " + favouriteContact + "'></span>" +
            "</div>" +
            "<span id='js-details_close' class='details_close icon'></span>" +
          "</div>" +
          "<p class='details_email'>" + contacts[parseInt(e.currentTarget.id)].email + "</p>";
        details.style.display = "block";

        document.getElementById('js-details_favourite').onclick = function (e) {
          contacts[contactId].favourite = !contacts[contactId].favourite;
          if (e.currentTarget.getAttribute("class") == "icon details_favourite_checked") {
            e.currentTarget.setAttribute("class", "icon details_favourite_unchecked");
          } else {
            e.currentTarget.setAttribute("class", "icon details_favourite_checked");
          }
        }
        document.getElementById('js-details_close').onclick = function () {
          details.innerHTML = "";
          details.style.display = "none";
        }

        window.onclick = function(event) {
          if (event.target == details) {
            details.style.display = "none";
          }
        }
      };
      document.getElementById("js-contactList").appendChild(el);
    }

    document.getElementById('js-filter_link').onclick = function (e) {
      const contactNames = document.querySelectorAll('.contactList_item');

      if (e.currentTarget.innerText === "Visa alla") {
        e.currentTarget.innerText = "Filtrera favoriter"
        contactNames.forEach(function (node, i) {
          node.setAttribute("class", "contactList_item");
        })
      } else {
        e.currentTarget.innerText = "Visa alla";
        contactNames.forEach(function (node, i) {
          if (contacts[i].favourite) {
            node.setAttribute("class", "contactList_item");
          } else {
            node.setAttribute("class", "hidden contactList_item");
          }
        })
      }
      contactNames.style.display = "block";
    };

    document.getElementById('js-searchBar_button').onclick = function () {
      const contactNames = document.querySelectorAll('.contactList_item');
      contactNames.forEach(function (node) {
        const regexp = new RegExp(document.getElementById('js-searchBar_field').value.toLowerCase());
        if (regexp.test(node.innerText.toLowerCase())) {
          node.setAttribute("class", "contactList_item");
        } else {
          node.setAttribute("class", "hidden contactList_item");
        }
      })
    }
  }

  render();
};

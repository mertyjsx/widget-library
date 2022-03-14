
class WidgetClass {
    constructor(config) {
      this.config = config;
    }
  start = () => {
      $.when(
        $.getScript("https://unpkg.com/react@17/umd/react.development.js"),
        $.getScript("https://unpkg.com/react-dom@17/umd/react-dom.development.js")
      ).done(() => renderReactWidget(this.config));
    };
  }
  
  const renderReactWidget = (config) => {
    "use strict";
    const e = React.createElement;
  
    const widgetAttributes = config.attributes || ["black", "red", "blue"];
    const widgetPlaceHolder = config.placeholder || ".product-price";
    const widgetPlaceHolderText = config.placeholder_text || "Surprise me with the color";
    const widgetImage = config.image || window.location.origin + "/images/black.png";
    //const widgetCardButton=config.cart_button||".cart-btn"
    const widgetSelectAttribute=config.select_attribute||function(attr) {
     $(".active").removeClass("active");
      $(".left-column img[data-image = " + attr + "]").addClass("active");
      document.querySelector(`input#${attr}`).checked = true;
    }
  
    const containerComponent = () => {
      const [modal, setModal] = React.useState(false);
  
      return e("div", { style: {} }, [
        e(ButtonComponent, { setModal }),
        e(ModalContainer, { modal, setModal }),
      ]);
    };
  
    const imageContent = () => {
      return e("div", {
        style: {
          ...styleContext.imageStyle,
          backgroundImage: `url("${widgetImage}")`,
        },
      });
    };
  
    //Buttons
    const ButtonComponent = ({ setModal }) => {
      return e(
        "div",
        {
          onClick: () => setModal(true),
          style: styleContext.initialButton,
        },
        widgetPlaceHolderText
      );
    };
  
    const nextButton = ({ text, setPage }) => {
      return e(
        "div",
        {
          style: styleContext.orangeButton,
          onClick: () => setPage((state) => state + 1),
        },
        text
      );
    };
  
    const closeButton = ({ setModal }) => {
      return e(
        "svg",
        { style: styleContext.closeButton, onClick: () => setModal(false) },
        e(
          "path",
          {
            d: "M10.872,10.004 C11.321,9.864 11.747,9.631 12.102,9.275 L17.704,3.674 L16.29,2.26 L10.688,7.861 C10.298,8.252 9.665,8.252 9.274,7.861 L3.704,2.291 L2.29,3.705 L7.86,9.275 C8.224,9.639 8.66,9.875 9.121,10.013 C8.665,10.148 8.237,10.375 7.892,10.721 L2.29,16.322 L3.704,17.736 L9.307,12.135 C9.684,11.757 10.34,11.757 10.72,12.135 L16.29,17.705 L17.704,16.291 L12.134,10.721 C11.779,10.366 11.34,10.137 10.872,10.004",
          },
          null
        )
      );
    };
    const backButton = ({ setPage }) => {
      return e(
        "svg",
        {
          style: styleContext.backButton,
          onClick: () => setPage((state) => state - 1),
        },
        e(
          "path",
          {
            d: "M7.2113,18.308 L1.2113,10.619 C0.9293,10.257 0.9293,9.75 1.2113,9.389 L7.2113,1.69 L8.7883,2.918 L4.0613,8.986 L19.0003,8.986 L19.0003,10.986 L4.0353,10.986 L8.7883,17.078 L7.2113,18.308 Z",
          },
          null
        )
      );
    };
  
    const attributeButton = ({ text, attribute, setModal, setPage }) => {
      const clickHandler = () => {
      widgetSelectAttribute(attribute)
      
        setModal(false);
        setPage(0);
      };
      return e(
        "div",
        { style: styleContext.orangeButton, onClick: clickHandler },
        text
      );
    };
  
    //Layout
  
    const ModalContainer = ({ modal, setModal }) => {
      return e(
        "div",
        {
          style: {
            ...styleContext.modalContainer,
            display: modal ? "flex" : "none",
          },
        },
        e(ModalContent, { setModal })
      );
    };
  
    const LoadingComponent = ({ setPage }) => {
      React.useEffect(() => {
        setTimeout(() => {
          setPage((state) => state + 1);
        }, 2000);
      }, []);
  
      return e(
        "img",
        {
          style: styleContext.animation,
          src: "http://localhost:3355/images/wheel-animation.gif",
        },
        null
      );
    };
  
    const AttributeComponent = ({ setPage, setModal }) => {
      const [attr, setAttr] = React.useState("");
  
      React.useEffect(() => {
        var randomAttr =
        widgetAttributes[Math.floor(Math.random() * widgetAttributes.length)];
        setAttr(randomAttr);
      }, []);
  
      return e("div", { style: styleContext.centerColumn }, [
        ...widgetAttributes.map((attribute) =>
          e(
            "div",
            {
              onClick: () => setAttr(attribute),
              style:
                attribute === attr
                  ? {...styleContext.blackButton,backgroundColor:attr}
                  : styleContext.borderButton,
            },
            attribute
          )
        ),
        e(attributeButton, {
          text: "Select me",
          setModal,
          setPage,
          attribute: attr,
        }),
      ]);
    };
  
    const ModalContent = ({ setModal }) => {
      const [page, setPage] = React.useState(0);
  
      const contentArray = [
        e("div", { style: styleContext.centerColumn }, [
          e(imageContent),
          e(nextButton, { text: "suprize me !", setPage }),
        ]),
        e(LoadingComponent, { setPage }),
        e(AttributeComponent, { setModal, setPage }),
      ];
  
      return e("div", { style: styleContext.modalContent }, [
        contentArray[page],
        e(closeButton, {
          setModal,
          lastContent: page === contentArray.length - 1,
        }),
        page !== 0 && e(backButton, { setPage }),
        e(
          "div",
          { style: styleContext.number },
          `${page + 1}/${contentArray.length}`
        ),
      ]);
    };
  
    const domContainer = document.querySelector(widgetPlaceHolder);
    const reactRoot = document.createElement("div");
   
    insertAfter(reactRoot,domContainer);
    ReactDOM.render(e(containerComponent), reactRoot);
   
  };
  
  function insertAfter(newElement, referenceElement) {
      referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
  }
  
  const Widget = (config) => new WidgetClass(config);
  
  //<svg height="20" width="20" class="es-close-btn"><path  fill="rgba(12, 7, 6, 1)" style="transition: fill 0.2s ease 0s;"></path></svg>
  const styleContext = {
      modalContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
    
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 100,
        color: "white",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    
        height: "100vh",
      },
      modalContent: {
        padding: "3rem",
        maxWidth: 600,
        minHeight: 300,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        color: "#000",
        textAlign: "center",
        borderRadius: 10,
        position: "relative",
      },
      centerColumn: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      },
      imageStyle: {
        width: "100%",
        height: 300,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },
      blackButton: {
        margin: "10px",
        backgroundColor: "black",
        border: "none",
        borderRadius: "5px",
        width: "70%",
        padding: 14,
        fontSize: 16,
        color: "white",
        boxShadow: "rgb(180 180 180) 0px 6px 18px -5px",
        cursor: "pointer",
      },
      animation: { height: 400 },
      orangeButton: {
        margin: "10px",
        backgroundColor: "#ed6755",
        border: "none",
        borderRadius: "5px",
        width: "70%",
        padding: 14,
        fontSize: 16,
        color: "white",
        textAlign:"center",
        cursor: "pointer",
      },
      initialButton:{
          margin: "10px 0px",
          backgroundColor: "#ed6755",
          border: "none",
          borderRadius: "5px",
          
          padding: 14,
          fontSize: 16,
          color: "white",
          textAlign:"center",
          cursor: "pointer",
      },
      closeButton: {
        position: "absolute",
        top: 20,
        right: 20,
        width: 30,
        height: 30,
        cursor: "pointer",
      },
      number: {
        position: "absolute",
        bottom: 20,
        left: 20,
    
        color: "#909090",
        fontWeight: 300,
        fontSize: 12,
      },
      backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        width: 30,
        height: 30,
        cursor: "pointer",
      },
      borderButton: {
        margin: "10px",
        backgroundColor: "white",
        border: "1px solid #d1d1d0",
        borderRadius: "5px",
        width: "70%",
        padding: 14,
        fontSize: 16,
        color: "#d1d1d0",
    
        cursor: "pointer",
      },
      buttonComponent: {},
    };
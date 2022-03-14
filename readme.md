
# Widget Library

This widget has been prepared for Easysize.me in accordance with the following criteria 
 - The library can be loaded into any e-commerce product page
 - The library is configurable and is launched with a trigger
 - After that trigger, a button should be added to the placeholder element
 - When that placeholder button is clicked, a widget/model/iframe should open containing your React app
 - The react app should contain at least two tabs/pages/screens, implementation is your choice
 - First screen should visualise the image of the product and a button 'Surprise me'
 - When that button is clicked, a loading indicator should show up, with a 'randomising your choice' gif, animation or something alike
 - After a couple of seconds, the last screen should show up, showing the randomly selected attribute and a button 'Select me'
 - When that button is clicked, you should select that attribute on the product page and close your widget/model/iframe


 ## Installation

Clone this repository to your folder

```bash
npm install
npm run serve
```

## Usage

```

  let configuration = {
    attributes: ['red', 'blue', 'black'],
    placeholder: '.product-color',
    placeholder_text: 'Surprise me with the color',
    cart_button: '.cart-btn',
    image: window.location.origin + '/images/black.png',
    select_attribute: function(attr) {
      $(".active").removeClass("active");
       $(".left-column img[data-image = " + attr + "]").addClass("active");
       document.querySelector(`input#${attr}`).checked = true;
     }
  }




  let widget = Widget(configuration)
  setTimeout(widget.start, 2000)
```



## License
[MIT](https://choosealicense.com/licenses/mit/)


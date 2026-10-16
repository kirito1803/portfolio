/* ============================================================
   THEME CONFIG - every color and font used by the site.
   Change a value here and both pages update. No other file
   contains hard-coded colors.
   ============================================================ */
window.THEME = {
  colors: {
    background:   "#F9FAFF",  // page background
    surface:      "#FFFFFF",  // project cards, form fields
    text:         "#25282B",  // headings and main text
    muted:        "#7A7A7A",  // paragraphs, secondary text
    accent:       "#76C0EC",  // blob, buttons, underlines, role label
    onAccent:     "#25282B",  // text placed on top of the accent color
    border:       "#25282B",  // outlined buttons and nav underline
    shadow:       "rgba(80, 100, 160, 0.14)", // card shadow
    fieldBorder:  "#E3E6F2"   // form input borders
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body:    "'Nunito', system-ui, sans-serif",
    ui:      "'Roboto', system-ui, sans-serif"   // buttons
  },
  // Set to "" to skip loading web fonts (fallbacks are used instead)
  googleFontsUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&family=Playfair+Display:wght@600;700&family=Roboto:wght@500&display=swap"
};
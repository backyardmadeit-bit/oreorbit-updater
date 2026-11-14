/* Settings for the public copy of Critical Minerals from Orbit. */
window.ATLAS_CONFIG = {
  // where the live data files are, relative to this page
  dataBase: "live-data/",
  // the address people get when they copy a link to a view; empty means this page's own address
  shareUrl: "",
  // how often an open page checks for new data, in minutes
  refreshMinutes: 10,

  // v15: who runs the atlas. Each line shows on the page only when it is filled in.
  company: "David Madali · Bohemia Defense",
  companyId: "22229957",        // IČO
  address: "",          // registered address, one line
  contactEmail: "david@madali.cz",     // shown under the Monitoring pay button and in the phone pay sheet (the invoice line)
  // v27: the monitoring price, shown everywhere in the atlas (the library pages read it too)
  monitoringPrice: "49",
  monitoringPriceCzk: "1 200",   // shown next to the euro price in Czech (brand book p. 9)
  bookingUrl: "https://calendly.com/david-madali/30min",       // optional: a calendar link for "Book a call"
  briefSignupUrl: ""    // optional: a sign-up page for the Monday brief by email
};

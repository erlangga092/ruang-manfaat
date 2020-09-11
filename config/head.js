
export default {
  titleTemplate(title) {
    if (title) {
      return `${title} - Erlangga`
    }
    return 'Erlangga'
  },
  htmlAttrs: {
		lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, minimum-scale=1'
    },
    {
      hid: 'title',
      name: 'title',
      property: 'title',
      content: 'Erlangga'
    },
    {
      hid: 'description',
      name: 'description',
      property: 'description',
      content: 'I am software enginer'
    },
    {
			hid: 'og:title',
			name: 'og:title',
			property: 'og:title',
			content: 'Erlangga'
    },
    {
			hid: 'og:description',
			name: 'og:description',
			property: 'og:description',
			content: 'I am software enginer'
    },
    {
      hid: 'og:image:alt',
      name: 'og:image:alt',
      property: 'og:image:alt',
      content: 'Erlangga'
    },
    {
      name: 'google-site-verification',
      content: 'FxADGTkaDzhIA5Lt1c8ebMBO9U9y_8lsTsCzot6ZIUs'
    }
  ],
  link: [
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.gstatic.com'
    },
    {
      rel: 'preconnect',
      href: 'https://www.google-analytics.com'
    }
  ]
}

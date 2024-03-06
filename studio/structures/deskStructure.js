export const deskStructure = S =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Home & Nav Sidebar')
        .child(S.document().schemaType('nav').documentId('nav')),
      S.listItem()
        .title('About')
        .child(
          S.document().title('About').schemaType('about').documentId('about'),
        ),
      S.listItem()
        .title('Links')
        .child(
          S.document().title('Links').schemaType('links').documentId('links'),
        ),
      ...S.documentTypeListItems().filter(
        listItem =>
          ![
            'home',
            'nav',
            'emailForm',
            'socialPost',
            'notification',
            'details',
            'client',
            'filters',
            'link',
            'links',
            'tags',
            'about',
          ].includes(listItem.getId()),
      ),
    ])

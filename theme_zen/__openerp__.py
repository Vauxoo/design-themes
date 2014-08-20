{
    'name': 'Zen Theme',
    'description': 'Zen Theme',
    'category': 'Website',
    'version': '1.0',
    'author': 'OpenERP SA',
    'depends': [
                'website',
                'hr',
                'website_hr',
    ],
    'data': [
        'views/layout.xml',
        'views/pages.xml',
        'views/snippets.xml',
        'views/images.xml',
        'views/options.xml',
    ],
    'application': True,
}

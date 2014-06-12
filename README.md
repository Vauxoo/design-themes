Hacking Theme Zen
---

On this branch we created the module theme_vauxoo as a copy of the theme_zen.

The main idea is create a little how-to commit by commit to know how create our own themes in a clean way.

How add a new theme/features:
---

1. Clone this repository:
	
	`
	git clone git@github.com:Vauxoo/design-themes.git
	`

2. Create your own branch locally.

	`
	git checkout -b 8.0-your_new_feature_theme
	`

3. Push your first change branch to know you start to work on.

	`
	git push -u origin 8.0-your_new_feature_theme
	`

4. Code, clean and test as usual (declaring this folder as part of your addons-path).

5. Add your changes to have them versioned.

	`
	git add .
	`

6. Commit your changes.

	`
	git commit -m "[TAG] module: what you did"	
	`

7. Push your first change branch to know you start to work on.

	`
	git push -u origin 8.0-your_new_feature_theme
	`

First Adding your corporative colors:
---

As the bootstrap3 guide indicate we need to add our own set of colors and recompile the less files.

We do that doing


#!/bin/bash
# scaffold-wp-site.sh — Create WordPress starter theme with Tailwind CSS
# Usage: bash scaffold-wp-site.sh <site-name>

set -e # Exit on error

if [ -z "$1" ]; then
  echo "❌ Error: Site name required"
  echo "Usage: bash scaffold-wp-site.sh <site-name>"
  echo "Example: bash scaffold-wp-site.sh cafe-bloom"
  exit 1
fi

SITE_NAME=$1
SITE_NAME_CLEAN=$(echo "$SITE_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
OUTPUT_DIR="outputs/sites/$SITE_NAME_CLEAN"
THEME_DIR="$OUTPUT_DIR/wp-content/themes/$SITE_NAME_CLEAN"

echo "🚀 Scaffolding WordPress site: $SITE_NAME"
echo "📁 Output directory: $OUTPUT_DIR"

# Create directory structure
mkdir -p "$THEME_DIR"/{css,js,images,inc,template-parts}

echo "✅ Created directory structure"

# Create style.css (theme header)
cat > "$THEME_DIR/style.css" <<EOF
/*
Theme Name: $SITE_NAME
Theme URI: https://votreagence.com
Author: Votre Agence
Author URI: https://votreagence.com
Description: Custom WordPress theme for $SITE_NAME
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: ${SITE_NAME_CLEAN}
Tags: custom-background, custom-logo, custom-menu, featured-images, threaded-comments, translation-ready
*/

/* Tailwind CSS is loaded via CDN in header.php */
/* Add custom CSS below if needed */

:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --text-color: #1f2937;
  --bg-color: #ffffff;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
EOF

echo "✅ Created style.css"

# Create functions.php
cat > "$THEME_DIR/functions.php" <<'EOF'
<?php
/**
 * Theme functions and definitions
 */

// Theme setup
function theme_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Register navigation menus
    register_nav_menus([
        'primary' => __('Primary Menu', 'theme'),
    ]);

    // Add theme support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for HTML5
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ]);

    // Add support for custom logo
    add_theme_support('custom-logo', [
        'height'      => 100,
        'width'       => 400,
        'flex-width'  => true,
        'flex-height' => true,
    ]);
}
add_action('after_setup_theme', 'theme_setup');

// Enqueue scripts and styles
function theme_scripts() {
    // Main stylesheet
    wp_enqueue_style('theme-style', get_stylesheet_uri(), [], '1.0.0');

    // Main JavaScript (if needed)
    wp_enqueue_script('theme-script', get_template_directory_uri() . '/js/main.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'theme_scripts');

// Register widget areas
function theme_widgets_init() {
    register_sidebar([
        'name'          => __('Footer Widget Area', 'theme'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'theme'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
}
add_action('widgets_init', 'theme_widgets_init');

// Custom excerpt length
function theme_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'theme_excerpt_length');

// Custom excerpt more text
function theme_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'theme_excerpt_more');
?>
EOF

echo "✅ Created functions.php"

# Create header.php
cat > "$THEME_DIR/header.php" <<'EOF'
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <!-- Tailwind CSS CDN (for development) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo -->
        <div class="logo">
            <?php if (has_custom_logo()) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <a href="<?php echo esc_url(home_url('/')); ?>" class="text-2xl font-bold text-gray-800 hover:text-blue-600">
                    <?php bloginfo('name'); ?>
                </a>
            <?php endif; ?>
        </div>

        <!-- Mobile menu button -->
        <button id="mobile-menu-button" class="md:hidden text-gray-700 hover:text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'menu_class'     => 'flex space-x-6',
                'container'      => false,
                'fallback_cb'    => false,
            ]);
            ?>
        </div>
    </nav>

    <!-- Mobile Navigation -->
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
        <div class="container mx-auto px-4 py-4">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'menu_class'     => 'flex flex-col space-y-2',
                'container'      => false,
                'fallback_cb'    => false,
            ]);
            ?>
        </div>
    </div>
</header>
EOF

echo "✅ Created header.php"

# Create footer.php
cat > "$THEME_DIR/footer.php" <<'EOF'
<footer class="bg-gray-900 text-white py-12 mt-16">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- About -->
            <div>
                <h3 class="text-xl font-bold mb-4"><?php bloginfo('name'); ?></h3>
                <p class="text-gray-400"><?php bloginfo('description'); ?></p>
            </div>

            <!-- Links -->
            <div>
                <h3 class="text-xl font-bold mb-4">Liens rapides</h3>
                <?php
                wp_nav_menu([
                    'theme_location' => 'primary',
                    'menu_class'     => 'flex flex-col space-y-2 text-gray-400',
                    'container'      => false,
                    'fallback_cb'    => false,
                ]);
                ?>
            </div>

            <!-- Contact -->
            <div>
                <h3 class="text-xl font-bold mb-4">Contact</h3>
                <div class="text-gray-400 space-y-2">
                    <p>📍 Adresse ici</p>
                    <p>📞 <a href="tel:+15141234567" class="hover:text-white">(514) 123-4567</a></p>
                    <p>✉️ <a href="mailto:info@example.com" class="hover:text-white">info@example.com</a></p>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Tous droits réservés.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

<!-- Mobile menu toggle script -->
<script>
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});
</script>

</body>
</html>
EOF

echo "✅ Created footer.php"

# Create index.php
cat > "$THEME_DIR/index.php" <<'EOF'
<?php get_header(); ?>

<main class="container mx-auto px-4 py-12">
    <?php if (have_posts()) : ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail('medium', ['class' => 'w-full h-48 object-cover']); ?>
                        </a>
                    <?php endif; ?>

                    <div class="p-6">
                        <h2 class="text-2xl font-bold mb-2">
                            <a href="<?php the_permalink(); ?>" class="text-gray-800 hover:text-blue-600">
                                <?php the_title(); ?>
                            </a>
                        </h2>

                        <div class="text-gray-600 text-sm mb-4">
                            <?php echo get_the_date(); ?>
                        </div>

                        <div class="text-gray-700 mb-4">
                            <?php the_excerpt(); ?>
                        </div>

                        <a href="<?php the_permalink(); ?>" class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                            Lire la suite →
                        </a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <!-- Pagination -->
        <div class="mt-12">
            <?php the_posts_pagination([
                'prev_text' => '← Précédent',
                'next_text' => 'Suivant →',
            ]); ?>
        </div>

    <?php else : ?>
        <div class="text-center py-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Aucun contenu trouvé</h2>
            <p class="text-gray-600">Il semble qu'il n'y ait rien ici pour le moment.</p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
EOF

echo "✅ Created index.php"

# Create page.php
cat > "$THEME_DIR/page.php" <<'EOF'
<?php get_header(); ?>

<main class="container mx-auto px-4 py-12">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('max-w-4xl mx-auto'); ?>>
            <header class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    <?php the_title(); ?>
                </h1>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="mb-6">
                        <?php the_post_thumbnail('large', ['class' => 'w-full h-auto rounded-lg shadow-lg']); ?>
                    </div>
                <?php endif; ?>
            </header>

            <div class="prose prose-lg max-w-none">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
EOF

echo "✅ Created page.php"

# Create single.php
cat > "$THEME_DIR/single.php" <<'EOF'
<?php get_header(); ?>

<main class="container mx-auto px-4 py-12">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('max-w-4xl mx-auto'); ?>>
            <header class="mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    <?php the_title(); ?>
                </h1>

                <div class="text-gray-600 mb-4">
                    Publié le <?php echo get_the_date(); ?> par <?php the_author(); ?>
                </div>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="mb-6">
                        <?php the_post_thumbnail('large', ['class' => 'w-full h-auto rounded-lg shadow-lg']); ?>
                    </div>
                <?php endif; ?>
            </header>

            <div class="prose prose-lg max-w-none mb-8">
                <?php the_content(); ?>
            </div>

            <footer class="border-t pt-6">
                <?php
                // Previous/Next post navigation
                the_post_navigation([
                    'prev_text' => '← %title',
                    'next_text' => '%title →',
                ]);
                ?>
            </footer>
        </article>
    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
EOF

echo "✅ Created single.php"

# Create main.js
cat > "$THEME_DIR/js/main.js" <<'EOF'
// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Theme loaded');

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
EOF

echo "✅ Created main.js"

# Create README
cat > "$OUTPUT_DIR/README.md" <<EOF
# $SITE_NAME - WordPress Theme

Custom WordPress theme for **$SITE_NAME**.

## Installation

1. Copy the \`wp-content\` folder to your WordPress installation
2. Activate the theme in WordPress Admin → Appearance → Themes
3. Install recommended plugins:
   - **Contact Form 7** (forms)
   - **Yoast SEO** (SEO optimization)
   - **WP Rocket** (caching)
   - **UpdraftPlus** (backups)

## Features

- ✅ Mobile-responsive (Tailwind CSS)
- ✅ Custom header & footer
- ✅ Navigation menu support
- ✅ Featured images
- ✅ Blog/post templates
- ✅ Custom logo support

## Customization

### Colors
Edit \`style.css\` CSS variables:
\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
}
\`\`\`

### Menus
1. Go to Appearance → Menus
2. Create a new menu
3. Assign to "Primary Menu" location

### Logo
1. Go to Appearance → Customize → Site Identity
2. Upload logo

## Next Steps

1. **Content**: Add pages (Accueil, Services, À propos, Contact)
2. **Plugins**: Install Contact Form 7, Yoast SEO
3. **SEO**: Configure meta titles/descriptions
4. **Performance**: Enable caching (WP Rocket or Cloudflare)
5. **Security**: Install Wordfence or Sucuri

## Support

For issues or customizations, contact: [votre-email@example.com]
EOF

echo "✅ Created README.md"

# Create .gitignore
cat > "$OUTPUT_DIR/.gitignore" <<'EOF'
# WordPress
wp-config.php
wp-content/uploads/
wp-content/cache/
wp-content/backup*/
wp-content/upgrade/

# Plugins (keep in version control if custom)
# wp-content/plugins/

# Logs
*.log

# OS files
.DS_Store
Thumbs.db
EOF

echo "✅ Created .gitignore"

# Success message
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ WordPress theme scaffolded successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 Location: $OUTPUT_DIR"
echo ""
echo "📋 Next steps:"
echo "1. Copy $THEME_DIR to your WordPress wp-content/themes/ folder"
echo "2. Activate the theme in WordPress admin"
echo "3. Install plugins: Contact Form 7, Yoast SEO, WP Rocket"
echo "4. Create pages: Accueil, Services, À propos, Contact"
echo "5. Customize colors in style.css"
echo ""
echo "📖 Full instructions: $OUTPUT_DIR/README.md"
echo ""
Overview
This project is a simple recipe website where users can view recipe details, including the ingredients and directions. The website features a responsive design, hover effects, and dynamic interactions, making the user interface visually rich and interactive.

SCSS Features Used

1. Variables
   Where: Variables are used for color and font consistency throughout the website.
   How: $primary-color and other variables allow you to reuse values, making the design more maintainable and consistent.
File: _variables.scss
$primary-color: #ff6347;
   $secondary-color: #6c757d;

2. Custom Properties
   Where: Used to define card background color
   File: \_variables.scss

:root {
--card-bg-color: rgba(224, 234, 252, 0.9);
}

3. Nesting
   Where: Nesting is used throughout the SCSS to group related styles, reducing redundancy and improving readability.
   How: Styles for nested HTML elements like headings (h2) inside sections like .ingredients and .directions are nested for clarity.
   File: main.scss

.ingredients {
h2 {
font-size: 24px;
color: #333;
}

ol li {
font-size: 18px;
margin-bottom: 10px;
}
}

4. Interpolation
   Where: Used inside mixins and loops for generating dynamic class names.
   How: Interpolation (#{$i}) is used inside a loop to generate classes for margins dynamically.
   File: mixins.scss

@mixin generate-margins($range) {
  @for $i from 1 through $range {
    .m-#{$i} {
margin: rem($i \* 8);
}
}
}

@include generate-margins(5);

5. Mixins
   Where: A mixin is used to handle flexbox settings for reusable layouts.
   How: The flexbox mixin provides an easy way to apply common flexbox properties to multiple elements.
   File: \_mixins.scss

@mixin flexbox($direction: row, $align: center, $justify: center) {
display: flex;
flex-direction: $direction;
align-items: $align;
justify-content: $justify;
}

.recipe-info {
@include flexbox(column, flex-start, center);
}

6. Functions
   Where: SCSS functions are used to dynamically calculate spacing or font sizes.
   How: Functions are used to generate responsive padding and margins, making the design adaptable to different screen sizes.
   File: \_functions.scss
   @function rem($px) {
   @return $px / 16 \* 1rem;
   }

.recipe-card {
padding: rem(20);
}

7. Placeholder Selectors
   Where: Placeholder selectors (%) are used to define reusable styles for components like buttons and cards.
   How: Placeholder selectors allow you to avoid repetition by extending them into multiple classes.
   File: \_placeholders.scss
   %card {
   background-color: #fff;
   padding: 20px;
   border-radius: 12px;
   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
   }

.ingredients, .directions {
@extend %card;
}

8. Responsive Mixins
   Where: Responsive typography and layout adjustments are handled using media queries.
   How: Responsive mixins help apply different styles based on the screen size.
   File: \_mixins.scss
   @mixin responsive-font($min-size, $max-size) {
  font-size: calc(#{$min-size} + (#{$max-size} - #{$min-size}) \* ((100vw - 320px) / (1200 - 320)));
   }

h1 {
@include responsive-font(24px, 40px);
}

9. Color Functions
   Where: Used to adjust colors for hover effects and backgrounds.
   How: color.adjust() is used to lighten or darken colors for interactive effects.
   File: main.scss

.ingredients ol li:hover {
color: color.adjust($primary-color, $lightness: -10%);
}

10. Responsive :
    Where: Implemented across the entire page using CSS media queries.
    How: The layout adapts to different screen sizes, ensuring the recipe page is mobile-friendly and responsive. The .recipe-info section uses Flexbox to ensure proper alignment, while media queries ensure that the layout shifts for smaller screens.

File: functions.scss

@mixin responsive($device) {
  @media (min-width: map-get($breakpoints, $device)) {
@content;
}
}

11.Events in SCSS

.header {
&:hover {
background-color: color.adjust($primary-color, $lightness: -10%);
}
}

others :
1.Flexbox Layout
Where: Used to arrange the layout of the recipe details page.
How: Flexbox is used to align and space out elements, ensuring a responsive layout that works across all screen sizes.

.recipe-info {
display: flex;
flex-direction: column;
width: 100%;
max-width: 800px;
}

2.Card-Like Sections for Ingredients and Directions
Where: Ingredients and directions sections.
How: The sections for ingredients and directions have been styled as cards with a white background, subtle shadow, and rounded corners to create a modern UI design.
File: main.scss

.ingredients, .directions {
background-color: white;
padding: 20px;
border-radius: 12px;
box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /_ Card-like shadow _/
margin-bottom: 30px;
transition: transform 0.3s ease, box-shadow 0.3s ease; /_ Smooth hover effect _/
}

3. Background Image for Recipe Page
   Where: Specific background image for the recipe page.
   How: The background image is applied only to the recipe page by using a unique class on the body (.recipe-page).
   File: main.scss

   .recipe-page {
   background-image: url('../images/recipe-background.png');
   background-size: cover;
   background-position: center;
   }

Technologies Used
HTML5: For structuring the content.
SCSS (Sass): For styling the website, including variables, nesting, and hover effects.
JavaScript: For dynamic content loading.

How to Compile SCSS
To compile the SCSS into CSS, run the following command:

sass scss/main.scss css/styles.css
This will compile the SCSS file into a single CSS file.

Future Enhancements
Add more interactivity, such as filtering recipes or dynamically loading new recipe content.
Improve accessibility by adding ARIA labels and ensuring all interactive elements are keyboard-friendly.

<!-- @format -->

# General rules

1. Use single quotes. If you need to use contraction, use string literals instead.
2. Priority of properties, in order:
   1.1. **Properties vital for own functionality**
   `value`, `type`, etc.
   1.2. **Properties connected to external scope**
   Event handlers which define how the element interacts with the rest of the application.
   1.3. **Styles.**
3. Use `TailwindCSS`.
4. If the `Tailwind` classes applied to style a component makes the editor scroll on the horizontal axis,
   make a custom class in the stylesheet and apply the `Tailwind` classes to that class.

# Styling

## fonts

1. Use `.text-title` for document titles. This will apply [Lora](https://fonts.google.com/specimen/Lora).
2. Use `.text-time` for time and time zone. This will apply [Open Sans](https://fonts.google.com/specimen/Open+Sans).
3. Use `.text-body` for text in the documents. This will apply [Lora](https://fonts.google.com/specimen/Lora).
4. Use `.text-UI` for UI elements like buttons. This will apply [Raleway](https://fonts.google.com/specimen/Raleway).
5. Use `.text-footer` for texts in `<footer>`. This will apply [Open Sans](https://fonts.google.com/specimen/Open+Sans).

_While it may be more reasonable to use one class for the same font used, having separate classes for different components provide flexibility should the components need to be made more distinct in the future._

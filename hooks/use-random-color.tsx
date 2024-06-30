export default function useRandomColor() {
  function getRandomColor(): string {
    // Generates a random integer between 0 and 255
    const randomInt = () => Math.floor(Math.random() * 256);

    // Generates a random color with each RGB component
    const red = randomInt();
    const green = randomInt();
    const blue = randomInt();

    // Converts RGB to HSL to ensure the color is vibrant
    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255;
      g /= 255;
      b /= 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h: number = 0,
        s: number = 0,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
          default:
            break;
        }
        h /= 6;
      }

      return [h, s, l];
    };

    // Ensures the color is vibrant (saturation > 0.5 and lightness < 0.7)
    const [h, s, l] = rgbToHsl(red, green, blue);
    const isVibrant = s > 0.5 && l < 0.7;

    if (isVibrant) {
      const toHex = (num: number) => num.toString(16).padStart(2, "0");
      return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    } else {
      // Recursively generate a new color until it meets the criteria
      return getRandomColor();
    }
  }

  // Return a random color
  return getRandomColor();
}

export function getRandomRGBA(alpha: number) {
    const getRandomValue = () => Math.floor(Math.random() * 256);

    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

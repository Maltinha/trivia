export function applyBackgroundGradient() {
    const topColor = localStorage.getItem("bgTopColor") || "rgb(116, 5, 116)";
    const bottomColor = localStorage.getItem("bgBottomColor") || "rgb(192, 110, 124)";

    document.body.style.background =
        `linear-gradient(to bottom, ${topColor}, ${bottomColor})`;
}
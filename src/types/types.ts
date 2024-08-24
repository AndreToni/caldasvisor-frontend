interface VLibrasWidget {
    new (url: string): any;
}

interface Window {
    VLibras: {
        Widget: VLibrasWidget;
    };
}
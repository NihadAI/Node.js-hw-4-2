interface IPost {
    id?: string
    title: string;
    createdAt?: string;
    text: string;
}

interface IButton {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "reset" | "submit";
}

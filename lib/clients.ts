/**
 * Every client page we host.
 *
 * `id` is the folder name under app/(clients) — the same slug the visitor
 * counter stores counts under, so adding a client here is all the customers
 * dashboard needs.
 *
 * Kept apart from the UI so server components can read it without pulling MUI
 * into the server bundle.
 */

export type Client = {
    id: string;
    name: string;
    src: string;
};

export const ourClients: Client[] = [
    {
        id: "arab-clinic",
        name: "Arab Clinic",
        src: "/arab-clinic/logo.webp",
    },
    {
        id: "dr-coffee",
        name: "Dr Coffee",
        src: "/dr-coffee/logo.webp",
    },
    {
        id: "pizza-pepo",
        name: "Pizza Pepo",
        src: "/pizza-pepo/logo.webp",
    },
    {
        id: "jeep-city",
        name: "Jeep City",
        src: "/jeep-city/logo.webp",
    },
    {
        id: "bar-mousa",
        name: "بار موسى",
        src: "/bar-mousa/logo.webp",
    },
    {
        id: "steakburger",
        name: "Steak Burger",
        src: "/steakburger/logo.webp",
    },
    {
        id: "shaebiaat-zad",
        name: "شعبيات زاد",
        src: "/shaebiaat-zad/logo.webp",
    },
    {
        id: "dr-dalia",
        name: "Dr. Dalia A.abdulrahman",
        src: "/dr-dalia/logo.webp",
    },
    {
        id: "mohamed-lashen",
        name: "Dr. Mohamed Lashen",
        src: "/mohamed-lashen/logo.webp",
    },
    {
        id: "3baky",
        name: "3baky",
        src: "/3baky/logo.webp",
    },
    {
        id: "elite-bridge",
        name: "Elite Bridge",
        src: "/elite-bridge/logo.webp",
    },
    {
        id: "guzel",
        name: "guzel",
        src: "/guzel/logo.webp",
    },
    {
        id: "dr-bahr",
        name: "Dr. Bahr",
        src: "/dr-bahr/logo.webp",
    },
    {
        id: "osa",
        name: "OSA Optics",
        src: "/osa/logo.webp",
    },
    {
        id: "alsediq",
        name: "Al-Sediq Optics",
        src: "/alsediq/logo.webp",
    },
    {
        id: "pizza-laveraa",
        name: "Pizza Laveraa",
        src: "/pizza-laveraa/logo.webp",
    },
    {
        id: "alaa-elsareaa",
        name: "Alaa Elsareaa",
        src: "/alaa-elsareaa/logo.webp",
    },
];

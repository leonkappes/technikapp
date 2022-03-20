/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
    // `params.id` comes from [id].js
    //const item = await db.get(params.id);
    const event = {
        title: "Abiball",
        id: params.id,
        description: "Ein sehr gutes Veranstaltung",
        date: "18. März 2022 | 18:00 - 20:00 Uhr",
        needed: 6,
        accepted: 2,
        names: ['Lennart Münter', "Leon Kappes"],
        material: ['Beamer', 'Clickshare', '2x Mikros']
    }

    if (event) {
        return {
            body: { event }
        };
    }

    return {
        status: 404
    };
}
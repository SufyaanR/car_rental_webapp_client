//Car
export async function createCar(car) {
    const res = await fetch("http://localhost:8080/api/cars",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(car),
        mode: "cors"
    });
    return await res.json();
}

export async function getCar(id) {
    const res = await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    });
    return await res.json();
}
//User
export async function getUser(id) {
    const res = await fetch(`http://localhost:8080/api/pro-users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors"
    });
    return await res.json();
}

// Create new user
export async function createUser(user) {
    const res = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        mode: "cors"
    });
    return await res.json();
}

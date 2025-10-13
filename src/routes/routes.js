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

export async function updateCar(id, car) {
  const res = await fetch(`http://localhost:8080/api/cars/${id}`, {
    method: "PATCH", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
    mode: "cors"
  });
  return await res.json();
}

export async function deleteCar(id) {
  const res = await fetch(`http://localhost:8080/api/cars/${id}`, {
    method: "DELETE",
    mode: "cors",
  });
  if (!res.ok) throw new Error("Failed to delete car");
  return res;
}

export async function getAllCars() {
    const res = await fetch("http://localhost:8080/api/cars", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
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

export async function getProUser(id) {
    const res = await fetch(`http://localhost:8080/api/pro-users/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch ProUser");
    }

    return await res.json();
}

export async function getBusinessUser(id) {
    const res = await fetch(`http://localhost:8080/api/business-users/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });

    if (!res.ok) {
        if (res.status === 404) return null; 
        throw new Error("Failed to fetch BusinessUser");
    }

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

// Fetch payments
export async function getPaymentsByProUserId(proUserId) {
  const res = await fetch(`http://localhost:8080/payment/proUser/${proUserId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });

  if (!res.ok) throw new Error("Failed to fetch payments");
  return await res.json();
}

export async function getPaymentsByBusinessUserId(businessUserId) {
  const res = await fetch(`http://localhost:8080/payment/businessUser/${businessUserId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });

  if (!res.ok) throw new Error("Failed to fetch payments");
  return await res.json();
}

//Bookings
export async function getBookingsByProUserId(proUserId) {
  const res = await fetch(`http://localhost:8080/api/bookings/proUser/${proUserId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return await res.json();
}

export async function getBookingsByBusinessUserId(businessUserId) {
  const res = await fetch(`http://localhost:8080/api/bookings/businessUser/${businessUserId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return await res.json();
}


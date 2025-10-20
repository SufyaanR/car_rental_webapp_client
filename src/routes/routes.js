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
    const res = await fetch(`http://localhost:8080/api/basic-users/${id}`, {
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
export async function createBasicUser(user) {
    const res = await fetch("http://localhost:8080/api/basic-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        mode: "cors"
    });
    return await res.json();
}

export async function createProUser(user) {
    const res = await fetch("http://localhost:8080/api/pro-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        mode: "cors"
    });
    return await res.json();
}

export async function createBusinessUser(user) {
    const res = await fetch("http://localhost:8080/api/business-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        mode: "cors"
    });
    return await res.json();
}

// Login user
export async function loginBasicUser(credentials) {
    const res = await fetch("http://localhost:8080/api/basic-users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        mode: "cors"
    });
    return await res.text(); // returns "Login successful" or error message
}

export async function loginProUser(credentials) {
    const res = await fetch("http://localhost:8080/api/pro-users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        mode: "cors"
    });
    return await res.text(); // returns "Login successful" or error message
}

export async function loginBusinessUser(credentials) {
    const res = await fetch("http://localhost:8080/api/business-users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        mode: "cors"
    });
    return await res.text(); // returns "Login successful" or error message
}

export async function findBasicUserByUsername(username) {
    const res = await fetch(`http://localhost:8080/api/basic-users/username/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });
    return await res.json();
}

export async function findProUserByUsername(username) {
    const res = await fetch(`http://localhost:8080/api/pro-users/username/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });
    return await res.json();
}

export async function findBusinessUserByUsername(username) {
    const res = await fetch(`http://localhost:8080/api/business-users/username/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

export async function getSubPaymentsByProUserId(proUserId) {
    const res = await fetch(`http://localhost:8080/Subscription/proUser/${proUserId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch payments for Pro User ID ${proUserId}: ${res.status}`);
    }

    return await res.json();
}

export async function getSubPaymentsByBusinessUserId(businessUserId) {
    const res = await fetch(`http://localhost:8080/Subscription/businessUser/${businessUserId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch payments for Business User ID ${businessUserId}: ${res.status}`);
    }

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

//user bookings
export async function createBooking(booking) {
  try {
    const response = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`Failed to save booking: ${response.status}`);
    }

    const data = await response.json();
    console.log("Booking saved:", data);
    return data;
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
}

export async function createPayment(payment) {
    const res = await fetch("http://localhost:8080/payment/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
        mode: "cors"
    });

    if (!res.ok) {
        throw new Error(`Failed to process payment: ${res.status}`);
    }

    return await res.json();
}

// GET user by ID
export async function getBasicUserById(userId) {
    const res = await fetch(`http://localhost:8080/api/basic-users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });
    if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
    return await res.json();
}

// PATCH update user
export async function updateBasicUser(userId, updates) {
    const res = await fetch(`http://localhost:8080/api/basic-users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        mode: "cors"
    });
    if (!res.ok) throw new Error(`Failed to update user: ${res.status}`);
    return await res.json();
}

// DELETE user
export async function deleteBasicUser(userId) {
    const res = await fetch(`http://localhost:8080/api/basic-users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    });
    if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`);
    return true;
}

// business user routes
export async function getBusinessUserById(userId) {
    const res = await fetch(`http://localhost:8080/api/business-users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
    });
    if (!res.ok) throw new Error(`Failed to fetch business user: ${res.status}`);
    return await res.json();
}

export async function updateBusinessUser(userId, data) {
    const res = await fetch(`http://localhost:8080/api/business-users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update business user: ${res.status}`);
    return await res.json();
}

export async function deleteBusinessUser(userId) {
    const res = await fetch(`http://localhost:8080/api/business-users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
    });
    if (!res.ok) throw new Error(`Failed to delete business user: ${res.status}`);
    return true;
}

// pro user routes
export async function getProUserById(userId) {
    const res = await fetch(`http://localhost:8080/api/pro-users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
    });
    if (!res.ok) throw new Error(`Failed to fetch pro user: ${res.status}`);
    return await res.json();
}

export async function updateProUser(userId, data) {
    const res = await fetch(`http://localhost:8080/api/pro-users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Failed to update pro user: ${res.status}`);
    return await res.json();
}

export async function deleteProUser(userId) {
    const res = await fetch(`http://localhost:8080/api/pro-users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
    });
    if (!res.ok) throw new Error(`Failed to delete pro user: ${res.status}`);
    return true;
}

export async function getUserCars(userId, userType) {
    const url = `http://localhost:8080/api/cars/my-cars?userId=${userId}&userType=${userType}`;
    
    const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch cars: ${res.status}`);
    }

    return await res.json();
}



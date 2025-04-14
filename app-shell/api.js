export async function getVans(id) {
    const url = id ? `http://localhost:8000/api/vans/${id}` : "http://localhost:8000/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    console.log("Response from db: ",data)
    return data
}

export async function getHostVans(id) {
    const url = id ? `http://localhost:8000/api/host/vans/${id}` : "http://localhost:8000/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    console.log("GetHostvans: ",data)
    return data
}

export async function loginUser(creds) {
    const res = await fetch("http://localhost:8000/api/login", {
        method: "POST", 
        body: JSON.stringify(creds),
        headers: {
            'Content-Type': 'application/json'  // Make sure to add headers if necessary
        }
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

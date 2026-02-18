

export async function GET () {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/');   
    if(!response.ok) {
        return {'message': 'Error Fetching Data','status': response?.status}  
    }   
    return new Response(response.body);
}


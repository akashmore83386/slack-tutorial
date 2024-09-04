// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import React, { Component } from "react";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AppState {
//   users: User[];
//   isLoading: boolean;
//   error: string | null;
//   name: string;
//   email: string;
//   editingUserId: number | null;
//   searchQuery: string;
//   validationError: string | null;
// }

// export default class App extends Component<{}, AppState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       users: [],
//       isLoading: false,
//       error: null,
//       name: "",
//       email: "",
//       editingUserId: null,
//       searchQuery: "",
//       validationError: null,
//     };
//   }

//   componentDidMount() {
//     this.fetchUsers();
//   }

//   fetchUsers = async () => {
//     this.setState({ isLoading: true });
//     try {
//       const { data } = await axios.get(
//         "https://jsonplaceholder.typicode.com/users"
//       );
//       this.setState({ users: data });
//     } catch (error) {
//       this.setState({ error: "Error fetching users" });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, email, editingUserId } = this.state;

//     if (!name.trim()) {
//       this.setState({ validationError: "Name is required" });
//       return;
//     }

//     if (!this.validateEmail(email)) {
//       this.setState({ validationError: "Please enter a valid email address" });
//       return;
//     }

//     this.setState({ isLoading: true, validationError: null });

//     try {
//       if (editingUserId) {
//         const { data } = await axios.put(
//           `https://jsonplaceholder.typicode.com/users/${editingUserId}`,
//           { name, email }
//         );
//         this.setState((prevState) => ({
//           users: prevState.users.map((user) =>
//             user.id === editingUserId ? data : user
//           ),
//           editingUserId: null,
//           name: "",
//           email: "",
//         }));
//       } else {
//         const { data } = await axios.post(
//           "https://jsonplaceholder.typicode.com/users",
//           { name, email }
//         );
//         this.setState((prevState) => ({
//           users: [...prevState.users, data],
//           name: "",
//           email: "",
//         }));
//       }
//     } catch (error) {
//       this.setState({ error: "Error posting a new user" });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleEdit = (user: User) => {
//     this.setState({
//       editingUserId: user.id,
//       name: user.name,
//       email: user.email,
//     });
//   };

//   handleDelete = async (id: number) => {
//     this.setState({ isLoading: true });
//     try {
//       await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
//       this.setState((prevState) => ({
//         users: prevState.users.filter((user) => user.id !== id),
//       }));
//     } catch (error) {
//       this.setState({ error: "Error deleting a user" });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ searchQuery: e.target.value });
//   };

//   handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ name: e.target.value });
//   };

//   handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ email: e.target.value });
//   };

//   render() {
//     const {
//       users,
//       isLoading,
//       error,
//       name,
//       email,
//       editingUserId,
//       searchQuery,
//       validationError,
//     } = this.state;

//     const filteredUsers = users.filter(
//       (user) =>
//         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (isLoading)
//       return (
//         <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
//           <div>
//             <h1 className="text-xl md:text-7xl font-bold flex items-center">
//               L
//               <svg
//                 stroke="currentColor"
//                 fill="currentColor"
//                 strokeWidth="0"
//                 viewBox="0 0 24 24"
//                 className="animate-spin"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
//               </svg>{" "}
//               Loading . . .
//             </h1>
//           </div>
//         </div>
//       );
//     if (error) return <p>{error}</p>;

//     return (
//       <div className="max-w-2xl mx-auto p-4">
//         <div className="text-2xl font-bold text-center mb-4 text-rose-500">
//           Practice
//         </div>
//         <Input
//           type="text"
//           value={searchQuery}
//           placeholder="Search"
//           onChange={this.handleSearchChange}
//           className="mb-4 p-2 w-full border border-gray-300 rounded"
//         />
//         <form onSubmit={this.handleSubmit} className="mb-4 space-y-4">
//           <label className="block">
//             <span className="text-gray-700">Name:</span>
//             <Input
//               type="text"
//               name="name"
//               value={name}
//               placeholder="Name"
//               onChange={this.handleNameChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//             />
//           </label>

//           <label className="block">
//             <span className="text-gray-700">Email:</span>
//             <Input
//               type="text"
//               name="email"
//               value={email}
//               placeholder="Email"
//               onChange={this.handleEmailChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded"
//             />
//           </label>

//           <Button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//           >
//             {editingUserId ? "Edit user" : "Add a user"}
//           </Button>
//         </form>
//         {validationError && <p className="text-red-500">{validationError}</p>}
//         <ul className="space-y-4">
//           {filteredUsers.map((user) => (
//             <li
//               key={user.id}
//               className="flex justify-between items-center p-4 border border-gray-300 rounded"
//             >
//               <span className="flex-grow">
//                 {user.name} - {user.email}
//               </span>
//               <Button
//                 variant="secondary"
//                 onClick={() => this.handleEdit(user)}
//                 className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="secondary"
//                 onClick={() => this.handleDelete(user.id)}
//                 className="bg-red-500 text-white py-1 px-2 rounded"
//               >
//                 Delete
//               </Button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { Component } from "react";
import "./App.scss";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AppState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  name: string;
  email: string;
  editingUserId: number | null;
  searchQuery: string;
  validationError: string | null;
}

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      error: null,
      name: "",
      email: "",
      editingUserId: null,
      searchQuery: "",
      validationError: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    this.setState({ isLoading: true });
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.setState({ users: data });
    } catch (error) {
      this.setState({ error: "Error fetching users" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, editingUserId } = this.state;

    if (!name.trim()) {
      this.setState({ validationError: "Name is required" });
      return;
    }

    if (!this.validateEmail(email)) {
      this.setState({ validationError: "Please enter a valid email address" });
      return;
    }

    this.setState({ isLoading: true, validationError: null });

    try {
      if (editingUserId) {
        const { data } = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${editingUserId}`,
          { name, email }
        );
        this.setState((prevState) => ({
          users: prevState.users.map((user) =>
            user.id === editingUserId ? data : user
          ),
          editingUserId: null,
          name: "",
          email: "",
        }));
      } else {
        const { data } = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          { name, email }
        );
        this.setState((prevState) => ({
          users: [...prevState.users, data],
          name: "",
          email: "",
        }));
      }
    } catch (error) {
      this.setState({ error: "Error posting a new user" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleEdit = (user: User) => {
    this.setState({
      editingUserId: user.id,
      name: user.name,
      email: user.email,
    });
  };

  handleDelete = async (id: number) => {
    this.setState({ isLoading: true });
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      this.setState({ error: "Error deleting a user" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  render() {
    const {
      users,
      isLoading,
      error,
      name,
      email,
      editingUserId,
      searchQuery,
      validationError,
    } = this.state;

    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading)
      return (
        <div className="loading-screen">
          <div>
            <h1 className="loading-text">
              L
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="loading-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
              </svg>{" "}
              Loading . . .
            </h1>
          </div>
        </div>
      );
    if (error) return <p className="error-message">{error}</p>;

    return (
      <div className="container">
        <div className="title">Practice</div>
        <Input
          type="text"
          value={searchQuery}
          placeholder="Search"
          onChange={this.handleSearchChange}
          className="input"
        />
        <form onSubmit={this.handleSubmit} className="form">
          <label className="label">
            <span>Name:</span>
            <Input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleNameChange}
              className="input"
            />
          </label>

          <label className="label">
            <span>Email:</span>
            <Input
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleEmailChange}
              className="input"
            />
          </label>

          <Button type="submit" className="button button-primary">
            {editingUserId ? "Edit user" : "Add a user"}
          </Button>
        </form>
        {validationError && <p className="error-message">{validationError}</p>}
        {filteredUsers.length === 0 ? (
          <p className="no-results-message">No users found matching your search</p>
        ) : (
          <ul className="user-list">
            {filteredUsers.map((user) => (
              <li key={user.id} className="user-item">
                <span className="user-info">
                  {user.name} - {user.email}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => this.handleEdit(user)}
                  className="button button-secondary"
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.handleDelete(user.id)}
                  className="button button-danger"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

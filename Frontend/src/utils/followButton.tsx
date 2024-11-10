// const followHandle = (index : number, con : boolean) => {
//     const newFollowed = [...isFollowed];
//     newFollowed[index] = con;
//     setFollow(newFollowed);
// }

// const handleFollow = async (id : number, index : number) => {
//     followHandle(index, true);
//     try {
//         const token = localStorage.getItem('token');
//         const response = await Axios({
//             method: "get",
//             url: `${api}/follow${id}`,
//             headers: { 
//                 "Content-Type": "multipart/form-data",
//                 'Authorization': `Bearer ${token}`
//             },
//         });
//     } catch (error) {
//         console.error('Error follow the user', error);
//         followHandle(index, false);
//     }
//     };

// const handleUnfollow = async (id : number, index : number) => {
// followHandle(index, false);
// try {
//     const token = localStorage.getItem('token');
//     const response = await Axios({
//         method: "get",
//         url: `${api}/unfollow${id}`,
//         headers: { 
//             "Content-Type": "multipart/form-data",
//             'Authorization': `Bearer ${token}`
//         },
//     });
// } catch (error) {
//     console.error('Error unfollow the user', error);
//     followHandle(index, true);
// }
// };
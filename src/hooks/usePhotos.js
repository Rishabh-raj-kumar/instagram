import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/usercontext';
import { getUserByUserId,getPhotos } from '../services/firebase';

function usePhotos() {
    const [photos,setPhotos] = useState(null);
    const {user} = useContext(userContext);

    useEffect(() =>{
        const {uid : userId =''} = user;
        async function getTimelinePhotos(){
            const [{ following }] = await getUserByUserId(userId);
            let followedUserPhoto = [];

            if(following.length > 0){
                followedUserPhoto = await getPhotos(userId,following);
            }
            //  console.log(followedUserPhoto)
            //re arrange photos to the newest accordingly date created
            followedUserPhoto.sort((a,b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhoto);

        }

        getTimelinePhotos();
    },[])
  return {photos};
}

export default usePhotos
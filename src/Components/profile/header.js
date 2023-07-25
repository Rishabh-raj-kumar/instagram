import { useEffect, useState } from 'react';
import { isUserFollowingProfile, toggleFollowUser } from '../../services/firebase';
import Skeleton from 'react-loading-skeleton';

export default function Header({ photosCount,
  profile : {docId : profileDocId, userId : profileUserId,fullname,followers,following}
  ,followerCount,setFollowerCount,username : profileUsername,user}) {

    const [isFollowing,setIsFollowing] = useState(following);

    // const [activebtn,setActiveBtn] = useState(user[0].username && user[0].username !== profileUsername);

    const handleFollow = async() =>{
      setIsFollowing(!isFollowing);
      setFollowerCount({
        followerCount : isFollowing ? followers.length-1 : followers.length + 1
      })
      // console.log(user[0].userId)
      await toggleFollowUser(isFollowing,user[0].docId,profileDocId,profileUserId,user[0].userId);
      // console.log(res)
      location.reload()
    }

    useEffect(() =>{
         async function isLoggedInUserFollowingProfile(){
          try{
            if(user){
          console.log(user[0].username,profile.userId)
          const isFollow = await isUserFollowingProfile(user[0].username,profileUserId);
          console.log(isFollow)
          setIsFollowing(isFollow);
            }
          }catch(err){
            console.log(err);
          }
        };

          isLoggedInUserFollowingProfile();
    },[profileUserId])
  return (
    <>
    {console.log(profileUsername)}
    {/* {console.log(user[0])} */}
     <div className='mt-3 grid grid-cols-3 gap-4 justify-between max-w-lg-screen'>
      <div className='container flex justify-center'>
        <img className='rounded-full w-28 h-28'
        src={`/images/avatars/${profileUsername}.jpg`}/>
      </div>
      <div className='flex items-center justify-center flex-col col-span-2'>
      <div className='container flex items-center'>
        <p className='text-2xl mr-4'>{profileUsername}</p>
        {true && 
        <button className=' font-bold text-sm rounded text-white bg-blue-500 p-2 uppercase'
        onClick={handleFollow}>
          {isFollowing ? 'unfollow' : 'follow'}</button>}
      </div>
      <div className='container flex mt-4'>
         {followers === undefined || following === undefined ?(
           <Skeleton count={1} width={677} height={24}/>
         ): 
         (<><p className='mr-10'>
          <span className='font-bold'>{photosCount} Photos</span>
         </p>
         <p className='mr-10'>
         <span className='font-bold'>{followers.length} followers</span>
        </p>
        <p className='mr-10'>
        <span className='font-bold'>{following.length} following</span>
       </p></>)}
      </div>
     </div>
     </div>
    </>
  )
}
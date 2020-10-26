using APIServer.Exception;
using System;
using System.Collections.Generic;

namespace APIServer.User
{
    public static class UserManager
    {
        #region Properties
        private static List<RiotUser> mUsers;
        #endregion

        #region Method
        static UserManager()
        {
            mUsers = new List<RiotUser>();
        }

        public static void AddUser(RiotUser user)
        {
            if (user.IsValid() == false)
                throw new WebResponseException((int)WebResponseStatusCode.Invalid, $"UserManager.AddUser - Invalid User. {user}");

            lock (mUsers)
            {
                if (mUsers.Contains(user))
                    throw new WebResponseException((int)WebResponseStatusCode.AlreadyAdded, $"UserManager.AddUser - This user has already been added. {user}");

                mUsers.Add(user);
            }
        }

        public static void RemoveUser(RiotUser user)
        {
            if (user.IsValid() == false)
                throw new WebResponseException((int)WebResponseStatusCode.Invalid, $"UserManager.RemoveUser - Invalid User. {user}");

            lock (mUsers)
            {
                if (mUsers.Contains(user) == false)
                    throw new WebResponseException((int)WebResponseStatusCode.NotFound, $"UserManager.RemoveUser - Not Found User. {user}");

                mUsers.Remove(user);
            }
        }

        public static RiotUser GetUser(object value, RiotUserSearchOption option)
        {
            CheckValueTypeByOption(value, option);

            RiotUser foundUser = SearchUserByOption(value, option);
            if (foundUser == null)
                throw new WebResponseException((int)WebResponseStatusCode.NotFound, $"UserManager.GetUser - Not Found User. Value:{value}, Option:{option}");

            return foundUser;
        }
        #endregion

        #region Private Method
        private static RiotUser SearchUserByOption(object value, RiotUserSearchOption option)
        {
            RiotUser foundUser = null;

            lock (mUsers)
            {
                switch (option)
                {
                    case RiotUserSearchOption.Id:
                        foundUser = mUsers.Find(x => x.Id == value.ToString());
                        break;
                    case RiotUserSearchOption.Puuid:
                        foundUser = mUsers.Find(x => x.Puuid == value.ToString());
                        break;
                    case RiotUserSearchOption.AccountId:
                        foundUser = mUsers.Find(x => x.AccountId == value.ToString());
                        break;
                    case RiotUserSearchOption.Name:
                        foundUser = mUsers.Find(x => x.Name == value.ToString());
                        break;
                    default:
                        throw new ArgumentException($"UserManager.SearchUserByOption - This option is not supported. Option:{option}");
                }
            }

            return foundUser;
        }

        private static void CheckValueTypeByOption(object value, RiotUserSearchOption option)
        {
            TypeCode code = Type.GetTypeCode(value.GetType());

            switch (option)
            {
                case RiotUserSearchOption.Id:
                case RiotUserSearchOption.Puuid:
                case RiotUserSearchOption.AccountId:
                case RiotUserSearchOption.Name:
                    if (code != TypeCode.String)
                        throw new ArgumentException($"UserManager.CheckValueByOption - The value type matching this option is string. Value:{code} Option:{option}");

                    break;
                default:
                    throw new ArgumentException($"UserManager.CheckValueByOption - This option is not supported. Option:{option}");
            }
        }
        #endregion
    }
}

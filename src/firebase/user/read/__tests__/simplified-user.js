import {users, simplified_users} from "../../../data-for-tests/index";
import {getSimplifiedUser} from "../index";
import {callbackHelper} from "../../../../utils/test-helpers";
import {entityExists} from "../../utils/read/entity-exists";

describe('#readsSimplifiedUserData', ()=>{
  const {test_user_1, test_user_2} = users;
  const {test_simplified_user_1, test_simplified_user_2} = simplified_users;

  const testUserExistance = (uid, expectedData) => {
    test(`confirms ${uid} user existance in firebase`, done => {
      entityExists('users', uid, data => callbackHelper(data, expectedData, done));
    })
  };

  const testSimplifiedUserData = (uid, expectedData) =>{
    test(`returns simplified ${uid} user data`, done => {
      getSimplifiedUser(uid, data=>callbackHelper(data, expectedData, done))
    })
  };

  testUserExistance('random-uid', false);
  testUserExistance(test_user_1.uid, true);
  testUserExistance(test_user_2.uid, true);

  testSimplifiedUserData(test_user_1.uid, test_simplified_user_1);
  testSimplifiedUserData(test_user_2.uid, test_simplified_user_2);
});
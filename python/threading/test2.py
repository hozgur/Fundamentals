from uuid import uuid4

class Session():
    _current_session = uuid4()

    @property
    def current_session(self):
        return Session._current_session
    
    @current_session.setter
    def current_session(self, value):
        print("set current_session")
        raise AttributeError("can't set attribute")
    
    @staticmethod
    def set_current_session(value):
        Session._current_session = value
    
    def __init__(self):
        self.my_id = 0



print (Session.current_session)

sess = Session()
sess2 = Session()

#Session.current_session = 1
try:
    sess.current_session = 2
except Exception as e:
    print(e)

print(Session.current_session)
print(sess.current_session)
print(sess2.current_session)


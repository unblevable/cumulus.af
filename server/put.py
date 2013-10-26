# Include the Dropbox SDK
import PySide
# import PyQt
import dropbox
import urllib2
from ghost import Ghost
ghost = Ghost()

# Get your app key and secret from the Dropbox developer website
app_key = '7a870efg25be689'
app_secret = '0ly99wm2hgau5qq'

flow = dropbox.client.DropboxOAuth2FlowNoRedirect(app_key, app_secret)

# Have the user sign in and authorize this token
authorize_url = flow.start()
print '1. Go to: ' + authorize_url
print '2. Click "Allow" (you might have to log in first)'
print '3. Copy the authorization code.'

page, resources = ghost.open('http://my.web.page')
page, resources = ghost.evaluate(
    "document.getElementsByName('allow_access')[0].click();", expect_loading=True)
page, resources = ghost.wait_for_page_loaded()
print page
print resources

code = raw_input("Enter the authorization code here: ").strip()

# This will fail if the user enters an invalid authorization code
access_token, user_id = flow.finish(code)

client = dropbox.client.DropboxClient(access_token)
print 'linked account: ', client.account_info()

f = open('working-draft.txt')
response = client.put_file('/magnum-opus.txt', f)
print "uploaded:", response
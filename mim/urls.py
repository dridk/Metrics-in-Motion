from django.conf.urls import patterns, include, url
from django.contrib import admin
from mim.views import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
admin.autodiscover()

# v1_api = Api(api_name='v1')
# v1_api.register(WidgetResource())
# v1_api.register(ViewResource())
# v1_api.register(UserResource())



urlpatterns = patterns('',
	 ("^admin/", include(admin.site.urls)),
	 ("^users$", UserViewSet.as_view({"get":"list"})),
     ("^users/(?P<id>\d)$", UserViewSet.as_view({"get":"retrieve"})),
     ("^users/(?P<id>\d)/views$", UserViewSet.as_view({"get":"list_view"})),
     ("^users/(?P<id>\d)/views/(?P<view_id>\d)$", UserViewSet.as_view({"get":"retrieve_view"})),







    # Examples:
    # url(r'^$', 'mim.views.home', name='home'),
    # url(r'^mim/', include('mim.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

from django.conf.urls import patterns, include, url
from django.contrib import admin
from mim.api import ViewResource
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
admin.autodiscover()

view_resource = ViewResource()

urlpatterns = patterns('',
	("^admin/", include(admin.site.urls)),
	("^api/", include(view_resource.urls))
    # Examples:
    # url(r'^$', 'mim.views.home', name='home'),
    # url(r'^mim/', include('mim.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

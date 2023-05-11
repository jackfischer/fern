# This file was auto-generated by Fern from our API Definition.

from backports.cached_property import cached_property

from .resources.movie.client import AsyncMovieClient, MovieClient


class FernIr:
    def __init__(self, *, environment: str, header_auth: str):
        self._environment = environment
        self.header_auth = header_auth

    @cached_property
    def movie(self) -> MovieClient:
        return MovieClient(environment=self._environment, header_auth=self.header_auth)


class AsyncFernIr:
    def __init__(self, *, environment: str, header_auth: str):
        self._environment = environment
        self.header_auth = header_auth

    @cached_property
    def movie(self) -> AsyncMovieClient:
        return AsyncMovieClient(environment=self._environment, header_auth=self.header_auth)

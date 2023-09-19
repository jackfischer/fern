# This file was auto-generated by Fern from our API Definition.

import typing
import urllib.parse
from json.decoder import JSONDecodeError

import pydantic

from ...core.api_error import ApiError
from ...core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from ...core.jsonable_encoder import jsonable_encoder
from ...core.remove_none_from_dict import remove_none_from_dict
from ..types.types.metadata import Metadata
from ..types.types.movie import Movie
from ..types.types.movie_id import MovieId

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class ServiceClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def get_movie(self, movie_id: MovieId) -> Movie:
        """
        Parameters:
            - movie_id: MovieId.
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"movie/{movie_id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(Movie, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def create_movie(self, *, request: Movie) -> MovieId:
        """
        Parameters:
            - request: Movie.
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "movie"),
            json=jsonable_encoder(request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(MovieId, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def get_metadata(
        self,
        *,
        shallow: typing.Optional[bool] = None,
        tag: typing.Union[typing.Optional[str], typing.List[str]],
        x_api_version: str,
    ) -> Metadata:
        """
        Parameters:
            - shallow: typing.Optional[bool].

            - tag: typing.Union[typing.Optional[str], typing.List[str]].

            - x_api_version: str.
        """
        _response = self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "metadata"),
            params=remove_none_from_dict({"shallow": shallow, "tag": tag}),
            headers=remove_none_from_dict({**self._client_wrapper.get_headers(), "X-API-Version": x_api_version}),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(Metadata, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)


class AsyncServiceClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def get_movie(self, movie_id: MovieId) -> Movie:
        """
        Parameters:
            - movie_id: MovieId.
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"movie/{movie_id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(Movie, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def create_movie(self, *, request: Movie) -> MovieId:
        """
        Parameters:
            - request: Movie.
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "movie"),
            json=jsonable_encoder(request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(MovieId, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def get_metadata(
        self,
        *,
        shallow: typing.Optional[bool] = None,
        tag: typing.Union[typing.Optional[str], typing.List[str]],
        x_api_version: str,
    ) -> Metadata:
        """
        Parameters:
            - shallow: typing.Optional[bool].

            - tag: typing.Union[typing.Optional[str], typing.List[str]].

            - x_api_version: str.
        """
        _response = await self._client_wrapper.httpx_client.request(
            "GET",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "metadata"),
            params=remove_none_from_dict({"shallow": shallow, "tag": tag}),
            headers=remove_none_from_dict({**self._client_wrapper.get_headers(), "X-API-Version": x_api_version}),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(Metadata, _response.json())  # type: ignore
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

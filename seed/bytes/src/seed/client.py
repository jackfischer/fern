# This file was auto-generated by Fern from our API Definition.

import typing

import httpx

from .core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from .resources.service.client import AsyncServiceClient, ServiceClient


class SeedBytes:
    def __init__(self, *, base_url: str, timeout: typing.Optional[float] = 60):
        self._client_wrapper = SyncClientWrapper(base_url=base_url, httpx_client=httpx.Client(timeout=timeout))
        self.service = ServiceClient(client_wrapper=self._client_wrapper)


class AsyncSeedBytes:
    def __init__(self, *, base_url: str, timeout: typing.Optional[float] = 60):
        self._client_wrapper = AsyncClientWrapper(base_url=base_url, httpx_client=httpx.AsyncClient(timeout=timeout))
        self.service = AsyncServiceClient(client_wrapper=self._client_wrapper)

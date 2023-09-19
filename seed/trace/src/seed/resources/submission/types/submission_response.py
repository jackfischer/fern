# This file was auto-generated by Fern from our API Definition.

from __future__ import annotations

import typing

import pydantic
import typing_extensions

from ...commons.types.problem_id import ProblemId
from .code_execution_update import CodeExecutionUpdate
from .exception_info import ExceptionInfo
from .terminated_response import TerminatedResponse


class SubmissionResponse_ServerInitialized(pydantic.BaseModel):
    type: typing_extensions.Literal["serverInitialized"]

    class Config:
        frozen = True
        smart_union = True


class SubmissionResponse_ProblemInitialized(pydantic.BaseModel):
    type: typing_extensions.Literal["problemInitialized"]
    value: ProblemId

    class Config:
        frozen = True
        smart_union = True


class SubmissionResponse_WorkspaceInitialized(pydantic.BaseModel):
    type: typing_extensions.Literal["workspaceInitialized"]

    class Config:
        frozen = True
        smart_union = True


class SubmissionResponse_ServerErrored(ExceptionInfo):
    type: typing_extensions.Literal["serverErrored"]

    class Config:
        frozen = True
        smart_union = True
        allow_population_by_field_name = True


class SubmissionResponse_CodeExecutionUpdate(pydantic.BaseModel):
    type: typing_extensions.Literal["codeExecutionUpdate"]
    value: CodeExecutionUpdate

    class Config:
        frozen = True
        smart_union = True


class SubmissionResponse_Terminated(TerminatedResponse):
    type: typing_extensions.Literal["terminated"]

    class Config:
        frozen = True
        smart_union = True
        allow_population_by_field_name = True


SubmissionResponse = typing.Union[
    SubmissionResponse_ServerInitialized,
    SubmissionResponse_ProblemInitialized,
    SubmissionResponse_WorkspaceInitialized,
    SubmissionResponse_ServerErrored,
    SubmissionResponse_CodeExecutionUpdate,
    SubmissionResponse_Terminated,
]
